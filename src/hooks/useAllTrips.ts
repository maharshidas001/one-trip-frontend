import { useQuery } from "@tanstack/react-query";

export const useAllTrips = (promiseFn: () => Promise<any>) => {
  return useQuery({
    queryKey: ['allTrips'],
    queryFn: promiseFn,
    retry: 1, // Number of times to retry a failed request
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
};