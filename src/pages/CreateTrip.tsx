import MaxWidth from "@/components/MaxWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tripService } from "@/services/Trip";
import { Ring } from "ldrs/react";
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect, useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface ICreateTripData {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  travelingWith: string;
  travelType: string;
  budget: string;
  stay: string;
  food: string;
}

const CreateTrip: FC = () => {

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [trip, setTrip] = useState<any>();
  const navigate = useNavigate();

  const { handleSubmit, register, control, formState: { errors } } = useForm<ICreateTripData>();


  const onSubmit = async (data: ICreateTripData) => {
    setIsFormSubmitting(true);

    try {
      const tripRes = await tripService.createTrip({
        destination: data.destination,
        dateRange: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        travelingWith: data.travelingWith,
        travlerCount: data.travelers,
        travelType: data.travelType,
        budget: data.budget,
        foodPreferance: data.food,
        stay: data.stay,
      });
      if (tripRes) {
        setTrip(tripRes);
      }
    } finally {
      setIsFormSubmitting(false);
    }
  };

  useEffect(() => {
    if (trip && trip._id) {
      navigate(`/dashboard/trip/${trip._id}`);
    }
  }, [trip]);

  return (
    <>
      <section className="py-10">
        <MaxWidth className="max-w-screen-lg p-0">
          <div>
            <Link to={'/dashboard'}>
              <div className="flex gap-2 items-center">
                <ArrowLeftIcon size={20} />
                <p>Dashboard</p>
              </div>
            </Link>
            <h2 className="text-3xl text-black text-center mt-3">Create your Trip Plan</h2>
            <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <label htmlFor="destination-field">Destination</label>
                <Input type="text" placeholder="Ex: Manali" id="destination-field" className="py-5"
                  {...register("destination", { required: "Destination is required" })}
                />
                {errors.destination && <p className="text-sm text-red-500">{errors.destination.message}</p>}
              </div>

              <div className="grid gap-2">
                <label>Dates</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input type="date" placeholder="Start" className="py-5" {...register("startDate", { required: "Start date is required" })} />
                  <Input type="date" placeholder="End" className="py-5" {...register("endDate", { required: "End date is required" })} />
                </div>
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              </div>

              <div className="grid gap-2">
                <label htmlFor="travelers-field">Travelers</label>
                <Input type="number" placeholder="Ex: 2" id="travelers-field" className="py-5" {...register("travelers", { required: "Number of travelers is required", valueAsNumber: true })} />
                {errors.travelers && <p className="text-sm text-red-500">{errors.travelers.message}</p>}
              </div>

              <div className="flex gap-6 flex-wrap">
                <div className="grid gap-2">
                  <label>Traveling With</label>
                  <Controller
                    name="travelingWith"
                    rules={{ required: "This field is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='solo'>Only Me</SelectItem>
                            <SelectItem value='partner'>Wife / Partner</SelectItem>
                            <SelectItem value='friends'>Friends</SelectItem>
                            <SelectItem value='family'>Family</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.travelingWith && <p className="text-sm text-red-500">{errors.travelingWith.message}</p>}
                </div>

                <div className="grid gap-2">
                  <label>Traveling Type</label>
                  <Controller
                    name="travelType"
                    control={control}
                    rules={{ required: "This filed is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='relax'>Relax</SelectItem>
                            <SelectItem value='adventure'>Adventure</SelectItem>
                            <SelectItem value='cultural'>Cultural</SelectItem>
                            <SelectItem value='leisure'>Leisure</SelectItem>
                            <SelectItem value='honeymoon'>Honeymoon</SelectItem>
                            <SelectItem value='business'>Business</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.travelType && <p className="text-sm text-red-500">{errors.travelType.message}</p>}
                </div>

                <div className="grid gap-2">
                  <label>Budget</label>
                  <Controller
                    name='budget'
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='budget'>Cheap</SelectItem>
                            <SelectItem value='mid-range'>Mid Range</SelectItem>
                            <SelectItem value='luxury'>Luxury</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <label>Stay</label>
                  <Controller
                    name="stay"
                    control={control}
                    rules={{ required: 'This filed is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='hotel'>Hotel</SelectItem>
                            <SelectItem value='hostel'>Hostel</SelectItem>
                            <SelectItem value='resort'>Resort</SelectItem>
                            <SelectItem value='camping'>Camping</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <label>Food</label>
                  <Controller
                    name="food"
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='vegan'>Vegan</SelectItem>
                            <SelectItem value='vegeterian'>Vegeterian</SelectItem>
                            <SelectItem value='non-veg'>Non Veg</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div>
                <Button type="submit" disabled={isFormSubmitting} >Generate Trip {isFormSubmitting ? <Ring color="white" size={20} stroke={4} /> : ''}</Button>
              </div>
            </form>
          </div>
        </MaxWidth>
      </section>
    </>
  )
};

export default CreateTrip;