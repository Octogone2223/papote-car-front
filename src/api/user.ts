import { kyApi } from '~/config-api';

const getUser = (id: string) => kyApi.get(`users/${id}`).json();

export { getUser };
