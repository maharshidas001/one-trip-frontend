import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ITripState {
  allTrips: any;
  setAllTrips: (trips: any) => void;
}

const useTripStore = create<ITripState>()(
  persist(
    set => ({
      allTrips: null,
      setAllTrips: (trips: any) => set({
        allTrips: trips
      })
    }),
    {
      name: "trips-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTripStore;