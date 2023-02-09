import { Car } from "./User";

export type Travel = {
    id:number;
    smoker:boolean;
    petAccepted:boolean;
    steps:[StepTravel];
    car:Car;
}

export type StepTravel = {
    dateStart:string;
    townStart:string;
    townEnd:string;
    place:number;
}