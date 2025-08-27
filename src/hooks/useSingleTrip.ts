import type { ITripData } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";

export const useSingleTrip = (promiseFn: () => Promise<ITripData>) => {
  return useQuery({
    queryKey: ['singleTrip'],
    queryFn: promiseFn,
    staleTime: 0,
  });
};