export interface PostUserCarInput {
  model: string;
  brand: string;
  color: string;
  place: number;
}

export interface PatchUserCarInput extends PostUserCarInput {
  id: number;
}
