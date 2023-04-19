import { Car } from './Car';

export type Travel = {
  id: number;
  smoker: boolean;
  petAccepted: boolean;
  steps: [StepTravel];
  car: Car;
};

export type StepTravel = {
  id: string;
  dateStart: string;
  townStart: string;
  townEnd: string;
  place: number;
};
