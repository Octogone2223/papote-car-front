import { userApi } from '@/api';
import ky from 'ky';
import { Input } from 'ky/distribution/types/options';
import { API_URI } from '~/config';

const hooks = {
  beforeRequest: [
    (request: any) => {
      request.headers.set(
        `Authorization`,
        `Bearer ${localStorage.getItem('accessToken')} `
      );

      return request;
    },
  ],

  afterResponse: [
    async (
      request: Input,
      options: any,
      response: { status: number; ok: boolean; json: () => Promise<any> }
    ) => {
      const body = await response.json();

      if (response.status === 422) {
        const currentRefreshToken = localStorage.getItem('refreshToken');

        if (currentRefreshToken) {
          const { accessToken, refreshToken } = await userApi.getNewTokens(
            currentRefreshToken
          );

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          return ky(request, options);
        }
      }

      if (body.error) {
        throw new Error(body.message);
      }
    },
  ],
};

export const kyApi = ky
  .create({
    prefixUrl: API_URI,
    headers: {
      'content-type': 'application/json',
    },
    throwHttpErrors: false,
  })
  .extend({
    hooks,
  });
