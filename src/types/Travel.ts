
export type Travel = {
    id:number;
    smoker:boolean;
    petAccepted:boolean;
    steps:[StepTravel];
}

export type StepTravel = {
    dateStart:string;
    townStart:string;
    townEnd:String;
    place:number;
}