import { api } from "@/config/axios";

interface ICreateTrip {
  destination: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  }
  travlerCount: number;
  travelingWith: string;
  travelType: string;
  budget: string;
  stay: string;
  foodPreferance: string;
}

class TripService {
  // Get All Trips
  async getAllTrips() {
    try {
      const res = await api.get("/api/v1/trip/all-trips");
      return res.data; // expected: trip object
    } catch (err) {
      console.error("All Trips Error:", err);
      return err;
    }
  }

  // Single Trip
  async getSingleTrip({ tripId }: { tripId: string }) {
    try {
      const res = await api.get(`/api/v1/trip/${tripId}`);
      return res.data; // expected: trip object
    } catch (err) {
      console.error("Single Trip Error:", err);
      return err;
    }
  }

  // Create Trip
  async createTrip({
    destination,
    travelingWith,
    travelType,
    travlerCount,
    dateRange: {
      startDate,
      endDate,
    },
    budget,
    stay,
    foodPreferance
  }: ICreateTrip) {
    try {
      const res = await api.post("/api/v1/trip/create", {
        destination,
        travelingWith,
        travelType,
        travlerCount,
        startDate,
        dateRange: {
          startDate,
          endDate,
        },
        budget,
        stay,
        foodPreferance
      });
      return res.data;
    } catch (err) {
      console.error("Logout Error:", err);
      return err;
    }
  }

  // Delete Trip
  async deleteTrip({ tripId }: { tripId: string }) {
    try {
      const res = await api.get(`/api/v1/trip/delete/${tripId}`);
      return res.data; // expected: user or null
    } catch (err) {
      console.error("AuthStatus Error:", err);
      return err;
    }
  }
}

export const tripService = new TripService();