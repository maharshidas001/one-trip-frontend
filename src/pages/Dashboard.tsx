import NoTrips from "@/components/NoTrips";
import TripCards from "@/components/TripCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { authService } from "@/services/Auth";
import { tripService } from "@/services/Trip";
import useAuthStore from "@/zustand/authStore";
import useTripStore from "@/zustand/tripStore";
import { PlusIcon, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface BudgetBreakdown {
  category: string;
  amount: number;
}

interface Activity {
  _id: string;
  location: string;
  time: string;
  ticketPrice: number;
  description: string;
}

interface DailyPlan {
  _id: string;
  day: number;
  date: string;
  activities: Activity[];
}

interface TripData {
  _id: string;
  tripTitle: string;
  travelingWith: string;
  stay: string;
  foodPreferance: string;
  budgetBreakdown: BudgetBreakdown;
  overview: string;
  imageUrl: string;
  dailyPlan: DailyPlan[];
}

const Dashboard = () => {

  const { logout } = useAuthStore();
  const { setAllTrips, allTrips } = useTripStore();
  const [isTripLoading, setIsTripLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trips" | "settings">("trips");

  const handleLogout = useCallback(async () => {

    const userRes = await authService.logout();
    if (userRes) {
      logout();
    }

  }, [logout]);

  useEffect(() => {
    async function getTrips() {
      try {
        const allTrips = await tripService.getAllTrips();

        if (allTrips && allTrips.data) {
          setAllTrips(allTrips);
        }
      } catch (error) {
        toast('Something went wrong.');
      } finally {
        setIsTripLoading(false);
      }
    };

    getTrips();
  }, [setAllTrips]);

  return (
    <>
      <section className="py-10">
        <div className="flex justify-between w-full">
          <h2 className="text-3xl text-black">Dashboard</h2>
          <Link to={'/dashboard/trip/create'}>
            <Button><PlusIcon size={18} />Create Trip</Button>
          </Link>
        </div>

        <div>
          <div className="w-full border-b-2 py-2 mt-4 flex gap-3">
            <Button variant={"ghost"} className={`${activeTab == 'trips' ? 'border-primary!' : ''} border-2 transition-none border-white`} onClick={() => setActiveTab('trips')}>My Trips</Button>
            <Button variant={"ghost"} className={`${activeTab == 'settings' ? 'border-primary!' : ''} border-2 transition-none border-white`} onClick={() => setActiveTab('settings')}>Settings</Button>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 py-1 px-3 rounded-lg flex items-center gap-2">
              <Search size={20} color="grey" />
              <Input type="text" placeholder="Search Trips" className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none focus:border-0 focus:outline-none' />
            </div>

            {/* My Trips */}
            {activeTab === 'trips' && (
              <div className="mt-3">
                {allTrips && allTrips.data.length > 0 ? (
                  <div>
                    {isTripLoading ? (
                      <>
                        <div className="flex flex-col w-[306px] gap-8 mt-3">
                          <Skeleton className="h-[208px] w-[306px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" />
                          <div>
                            <Skeleton className="h-8 mb-2" />
                            <Skeleton className="h-6" />
                          </div>
                        </div><div className="flex flex-col w-[306px] gap-8 mt-3">
                          <Skeleton className="h-[208px] w-[306px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" />
                          <div>
                            <Skeleton className="h-8 mb-2" />
                            <Skeleton className="h-6" />
                          </div>
                        </div><div className="flex flex-col w-[306px] gap-8 mt-3">
                          <Skeleton className="h-[208px] w-[306px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" />
                          <div>
                            <Skeleton className="h-8 mb-2" />
                            <Skeleton className="h-6" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
                        {allTrips.data.map((trip: TripData) => (
                          <TripCards title={trip.tripTitle} image={trip.imageUrl} id={trip._id} key={trip._id} />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NoTrips />
                )}
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p>Logout</p>
                  <Button variant={'outline'} className="" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
};

export default Dashboard;