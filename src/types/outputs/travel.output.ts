export interface PostTravelOutput {
  smoker: boolean;
  petAccepted: boolean;
  car: string;
  steps: Step[];
}

interface Step {
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
}
