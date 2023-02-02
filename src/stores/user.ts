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
    logMe() {
      const user = {
        id: 1,
        email: 'dazd@gmail.com',
        phone: '123456789',
        username: 'dazd',
        firstname: 'John',
        lastname: 'Doe',
        isVerified: true,
      };

      this.currentUser = user;
    },
  },
});
