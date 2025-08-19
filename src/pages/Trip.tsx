import MaxWidth from '@/components/MaxWidth';
import { tripService } from '@/services/Trip';
import useAuthStore from '@/zustand/authStore';
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
  dailyPlan: DailyPlan[];
}

const Trip: FC = () => {

  const { isAuthenticated } = useAuthStore();
  const [tripData, setTripData] = useState<TripData | null>(null);

  const navigate = useNavigate();
  const { tripId } = useParams();

  useEffect(() => {
    async function fetchData() {

      const tripRes = await tripService.getSingleTrip({ tripId: tripId as string });

      if (tripRes.data) {
        setTripData(tripRes.data);
      }

    };
    fetchData();
  }, [tripId]);

  if (!isAuthenticated) {
    navigate('/auth/login');
    return null;
  };

  return (
    <>
      <section className='py-10'>
        <MaxWidth className='max-w-screen-lg p-0'>
          <div>
            <Link to={'/dashboard'} className='w-min'>
              <div className="flex gap-2 items-center">
                <ArrowLeftIcon size={20} />
                <p>Dashboard</p>
              </div>
            </Link>

            <h2 className="text-3xl text-black mt-3">{tripData && tripData.tripTitle}</h2>
            <div className='w-full mt-4'>
              <div className='w-full py-2 px-3 bg-blue-100 rounded-lg flex gap-4 flex-wrap'>
                <p className='capitalize'>{tripData && tripData.travelingWith}</p>
                <p className='capitalize'>{tripData && tripData.stay}</p>
                <p className='capitalize'>{tripData && tripData.foodPreferance}</p>
                <p className='capitalize'>{tripData && tripData.budgetBreakdown.category}</p>
              </div>
              <div className='mt-3'>
                <p>{tripData && tripData.overview}</p>
              </div>
              <div className='mt-3'>
                <h3 className='text-black text-2xl'>Itineraries</h3>
                <div className='grid gap-4 mt-4'>

                  {
                    tripData && tripData.dailyPlan.map((daily: DailyPlan) => (
                      <div className='flex gap-4 items-center md:items-start justify-between md:flex-row flex-col pb-4 border-b-2' key={daily._id}>
                        <div>
                          <h3 className='text-2xl text-primary text-center'>Day {daily.day}</h3>
                          <p className='text-center'>{daily.date}</p>
                        </div>
                        <div className='sm:max-w-md grid gap-4'>
                          {
                            daily && daily.activities.map((dailyEach: Activity) => (
                              <div className='border-2 border-secondary p-3 rounded-lg' key={dailyEach._id}>
                                <p className='text-primary font-bold'>{dailyEach.location}</p>
                                <p><span className='font-bold'>Time:</span> {dailyEach.time}</p>
                                <p><span className='font-bold'>Ticket:</span> {dailyEach.ticketPrice}Rs</p>
                                <p className='mt-2'>{dailyEach.description}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
        </MaxWidth>
      </section>
    </>
  )
};

export default Trip;