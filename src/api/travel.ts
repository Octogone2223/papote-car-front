import { GetTravelInput, PostTravelInput } from "@/types/inputs/travel.input";
import { kyApi } from "~/config-api";

const ressource = "travel";

const postTravel = async (json: PostTravelInput) => {
  const response = await kyApi.post(`${ressource}`, { json });
  return response.json();
};

const getTravels = async (json: GetTravelInput) => {
  const response = await kyApi.get(`${ressource}`, { json });
  return response.json();
};

export { postTravel };
