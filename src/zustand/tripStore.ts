import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ITripState {
  allTrips: any;
  singleTrip: any;
  setAllTrips: (trips: any) => void;
  setSingleTrip: (trip: any) => void;
}

const useTripStore = create<ITripState>()(
  persist(
    set => ({
      allTrips: null,
      singleTrip: null,
      setAllTrips: (trips: any) => set({
        allTrips: trips
      }),
      setSingleTrip: (trip: any) => set({
        singleTrip: trip,
      }),
    }),
    {
      name: "trips-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTripStore;