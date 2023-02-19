export interface PostTravelInput {
  smoker: boolean;
  petAccepted: boolean;
  car: string;
  steps: Step[];
}

export interface GetTravelInput {
  smoker: boolean;
  petAccepted: boolean;
  startingPoint: string;
  endingPoint: string;
}

interface Step {
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
}