import { GetTravelInput, PostTravelInput } from "@/types/inputs/travel.input";
import { kyApi } from "~/config-api";

const ressource = "travel";

const postTravel = async (json: PostTravelInput) => {
  const response = await kyApi.post(`${ressource}`, { json });
  return response.json();
};

const getTravels = async (json: GetTravelInput) => {
  const searchParams = Object.fromEntries(
    Object.entries(json).map(([key, value]) => [key, value])
  );
  const response = await kyApi.get(`${ressource}`, { searchParams });
  return response.json();
};

const getTravelsUser = async () => {
  const response = await kyApi.get(`${ressource}/user`);
  return response.json();
};

export { postTravel, getTravels,getTravelsUser };
