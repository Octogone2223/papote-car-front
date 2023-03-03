import { PatchUserCarInput, PostUserCarInput } from '@/types/inputs';
import { kyApi } from '~/config-api';

const ressource = 'cars';

const postUserCar = async (json: PostUserCarInput): Promise<any> => {
  const response = await kyApi.post(`${ressource}`, {
    json,
  });
  return response.json();
};

const getUserCars = async (): Promise<any> => {
  const response = await kyApi.get(`${ressource}`);
  return response.json();
};

const updateUserCar = async (
  id: string,
  json: Omit<PatchUserCarInput, 'id'>
): Promise<any> => {
  const response = await kyApi.patch(`${ressource}/${id}`, {
    json,
  });
  return response.json();
};

const deleteUserCar = async (id: string): Promise<any> => {
  const response = await kyApi.delete(`${ressource}/${id}`);
  return response.json();
};

export { postUserCar, getUserCars, updateUserCar, deleteUserCar };
