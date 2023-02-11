import ky from 'ky';
import { Input } from 'ky/distribution/types/options';
import { API_URI } from '~/config';

const hooks = {
  beforeRequest: [
    (_request: any, options: any) => {
      console.log('before request');
      options.headers.set('x-api-key', '1111');
    },
  ],

  afterResponse: [
    async (
      request: Input,
      options: any,
      response: { status: number; ok: boolean; json: () => Promise<any> }
    ) => {
      const body = await response.json();

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
    credentials: 'include',
  })
  .extend({
    hooks,
  });
