export type User = {
  id: number;
  email: string;
  phone?: string;
  username: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
};

export type Car = {
  id:number;
  model:string;
  brand:string;
  color:string;
  place:number;
}
