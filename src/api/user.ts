import { LoginOutput, SendRegisterEmailOutput } from '@/types/outputs';
import { LoginInput, RegisterInput } from '../types/inputs/user.input';
import { kyApi } from '~/config-api';

const ressource = 'users';

const login = async (input: LoginInput): Promise<LoginOutput> => {
  const response = await kyApi.post(`${ressource}/login`, {
    json: {
      ...input,
    },
  });
  return response.json();
};

const sendRegisterEmail = async (
  input: RegisterInput
): Promise<SendRegisterEmailOutput> => {
  const response = await kyApi.post(`${ressource}/send-verification-email`, {
    json: {
      ...input,
    },
  });
  return response.json();
};

const register = async (token: string) => {
  const response = await kyApi.post(`${ressource}/register`, {
    json: {
      token,
    },
  });
  return response.json();
};

const whoami = async () => {
  const response = await kyApi.get(`${ressource}/whoami`);
  return response.json();
};

export { login, register, sendRegisterEmail, whoami };
