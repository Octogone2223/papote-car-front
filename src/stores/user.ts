interface User {
  id: number;
  email: string;
  phone?: string;
  username: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
}

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null,
  }),

  getters: {
    isLogin(): boolean {
      return !!this.currentUser;
    },
  },

  actions: {
    async login(loginDto: { email: string; password: string }) {
      this.loading = true;
      const user = {
        id: 1,
        email: 'dazd@gmail.com',
        phone: '123456789',
        username: 'dazd',
        firstname: 'John',
        lastname: 'Doe',
        isVerified: true,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.currentUser = user;
      this.loading = false;
    },

    async register(registerDto: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    }) {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
