import { API_URI_WS } from '~/config';
import { io } from 'socket.io-client';

export const useSocketIO = () => {
  const socket = io(API_URI_WS);
  return {
    socket,
  };
};
