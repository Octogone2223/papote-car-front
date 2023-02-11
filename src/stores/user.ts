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

      const user = await userApi.login(input);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.currentUser = null;
      this.loading = false;
    },
  },
});
