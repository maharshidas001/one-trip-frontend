export interface ICreateTripData {
  _id?: string;
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