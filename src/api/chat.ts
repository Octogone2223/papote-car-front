import { kyApi } from '~/config-api';

const ressource = 'rooms';

const getRooms = async () => {
  const response = await kyApi.get(ressource).json();
  return response;
};

const postMessage = async (receiver: string) => {
  const response = await kyApi
    .post(`${ressource}/conversation`, { json: { receiver } })
    .json();
  return response;
};

export { getRooms, postMessage };
