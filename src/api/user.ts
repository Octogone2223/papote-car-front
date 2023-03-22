import {
  LoginOutput,
  RegisterOutput,
  SendRegisterEmailOutput,
  UpdateOutput,
  WhoIAmOutput,
} from '@/types/outputs';
import {
  LoginInput,
  RegisterInput,
  UpdateInput,
} from '../types/inputs/user.input';
import { kyApi } from '~/config-api';

const ressource = 'users';

const login = async (json: LoginInput): Promise<LoginOutput> => {
  const response = await kyApi.post(`${ressource}/login`, {
    json,
  });
  return response.json();
};

const sendRegisterEmail = async (
  json: RegisterInput
): Promise<SendRegisterEmailOutput> => {
  const response = await kyApi.post(`${ressource}/send-verification-email`, {
    json,
  });
  return response.json();
};

const register = async (token: string): Promise<RegisterOutput> => {
  const response = await kyApi.post(`${ressource}/register`, {
    json: {
      token,
    },
  });
  return response.json();
};

const getNewTokens = async (): Promise<RegisterOutput> => {
  const response = await kyApi.get(`${ressource}/refresh-tokens`);

  return response.json();
};

const whoami = async (): Promise<WhoIAmOutput> => {
  const response = await kyApi.get(`${ressource}/whoami`);
  return response.json();
};

const update = async (json: UpdateInput): Promise<UpdateOutput> => {
  const response = await kyApi.patch(`${ressource}/update-user`, {
    json,
  });
  return response.json();
};

export { login, register, sendRegisterEmail, whoami, getNewTokens, update };
