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

interface BudgetBreakdown {
  category: string;
  amount: number;
}

export interface Activity {
  _id: string;
  location: string;
  time: string;
  ticketPrice: number;
  description: string;
}

export interface DailyPlan {
  _id: string;
  day: number;
  date: string;
  activities: Activity[];
}

export interface ITripData {
  _id: string;
  tripTitle: string;
  travelingWith: string;
  stay: string;
  foodPreferance: string;
  budgetBreakdown: BudgetBreakdown;
  overview: string;
  dailyPlan: DailyPlan[];
}