import { User } from '@/types';
import { userApi } from '@/api';
import { LoginInput, RegisterInput } from '@/types/inputs';

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    currentUser: null as User | null,
    loading: false,
    // errors: {} as { [k in keyof User]?: string[] } & { password?: string[] },
  }),

  getters: {
    isLogin(): boolean {
      return !!this.currentUser;
    },
  },

  actions: {
    async login(input: LoginInput) {
      this.loading = true;

      const { accessToken, refreshToken } = await userApi.login(input);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const user = await userApi.whoami();
      // this.errors = errorsHandler(err.message);

      this.currentUser = user;
      this.loading = false;
    },

    async register(input: RegisterInput) {
      this.loading = true;

      await userApi.sendRegisterEmail(input);

      this.loading = false;
    },

    async whoAmI() {
      this.loading = true;

      const user = await userApi.whoami();
      this.currentUser = user;

      this.loading = false;
    },

    async logout() {
      this.loading = true;

      await userApi.logout();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      this.currentUser = null;
      this.loading = false;
    },

    async update(input: User) {
      this.loading = true;

      const user = await userApi.update(input);

      this.currentUser = user;
      this.loading = false;
    },

    async updatePassword(newPassword: string) {
      this.loading = true;

      localStorage.setItem('tempPassword', newPassword);

      if (!this.currentUser) {
        throw new Error('No user found');
      }

      await userApi.updatePassword({
        email: this.currentUser?.email,
      });

      this.loading = false;
    },
  },
});
