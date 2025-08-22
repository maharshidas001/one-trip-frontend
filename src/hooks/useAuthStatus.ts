import { useQuery } from "@tanstack/react-query";

export const useAuthStatus = (promiseFn: () => Promise<any>) => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: promiseFn,
    retry: 1, // Number of times to retry a failed request
    staleTime: Infinity, // Data won't be refetched automatically
    refetchOnWindowFocus: false,
  });
};