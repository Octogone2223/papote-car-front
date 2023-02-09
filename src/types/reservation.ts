import { StepTravel } from "./Travel";
import { User } from "./User";

export type Reservation = {
  id: number;
  validated: boolean;
  user: User;
  stepTravel: StepTravel;
};
