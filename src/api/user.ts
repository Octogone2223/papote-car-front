import {
  LoginOutput,
  RegisterOutput,
  ResetPasswordOutput,
  SendRegisterEmailOutput,
  UpdateOutput,
  UpdatePasswordOutput,
  WhoIAmOutput,
} from '@/types/outputs';
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateInput,
  UpdatePasswordInput,
} from '@/types/inputs';
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

const updatePassword = async (
  json: UpdatePasswordInput
): Promise<UpdatePasswordOutput> => {
  const response = await kyApi.post(`${ressource}/send-password-reset-email`, {
    json,
  });
  return response.json();
};

const resetPassword = async (
  json: ResetPasswordInput
): Promise<ResetPasswordOutput> => {
  const response = await kyApi.patch(`${ressource}/reset-password`, {
    json,
  });
  return response.json();
};

const logout = async (): Promise<void> => {
  await kyApi.get(`${ressource}/logout`);
};

export {
  login,
  register,
  sendRegisterEmail,
  whoami,
  getNewTokens,
  update,
  updatePassword,
  resetPassword,
  logout,
};
