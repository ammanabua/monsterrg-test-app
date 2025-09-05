export interface FlightInfoPayload {
  airline: string | null;
  arrivalDate: string | null;
  arrivalTime: string | null;
  flightNumber: string | null;
  numOfGuests: number | null;
  comments?: string | null;
}