import { IConversation } from '@/types';
import { kyApi } from '~/config-api';

const ressource = 'rooms';

const getRooms = async (): Promise<IConversation[]> => {
  const response = await kyApi.get(ressource);
  return response.json();
};

const postMessage = async (receiver: string) => {
  const response = await kyApi
    .post(`${ressource}/conversation`, { json: { receiver } })
    .json();
  return response;
};

export { getRooms, postMessage };
