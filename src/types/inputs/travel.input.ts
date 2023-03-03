export interface PostTravelInput {
  smoker: boolean;
  petAccepted: boolean;
  car: string;
  steps: Step[];
}

export interface Step {
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
}
