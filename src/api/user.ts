import { LoginInput, RegisterInput } from '../types/inputs/user.input';
import { kyApi } from '~/config-api';

const ressource = 'users';

const login = async (input: LoginInput) => {
  const response = await kyApi.post(`${ressource}/login`, {
    json: {
      ...input,
    },
  });
  return response.json();
};

const register = async (input: RegisterInput) => {
  const response = await kyApi.post(`${ressource}/register`, {
    json: {
      ...input,
    },
  });
  return response.json();
};

export { login, register };
