export interface PostTravelInput {
  smoker: boolean;
  petAccepted: boolean;
  car: string;
  steps: Step[];
}


export interface GetTravelInput {
  petAccepted: boolean;
  smoker: boolean;
  date: string;
  townStart: string;
  townEnd: string;
}

interface Step {
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
}
