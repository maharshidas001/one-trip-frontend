import type { ICreateTripData } from "@/types/interfaces";
import { useMutation } from "@tanstack/react-query";

export const useCreateTrip = (promiseFn: (data: ICreateTripData) => Promise<any>) => {
  return useMutation({
    mutationKey: ['createTrip'],
    mutationFn: promiseFn,
  });
};