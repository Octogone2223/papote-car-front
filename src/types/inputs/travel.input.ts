export interface PostTravelInput {
  smoker: boolean;
  petAccepted: boolean;
  car: string;
  steps: Step[];
}

export interface GetTravelInput {
  startingPoint: string;
  endingPoint: string;
  passengerCount: number;
  travelDate: string;
  isSmoker: boolean;
  petsAllowed: boolean;
}

interface Step {
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
}