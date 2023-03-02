import { Car } from './../types/Car';

export const useUserStore = defineStore({
  id: 'carStore',

  state: () => ({
    cars: null as Car | null,
    loading: false,
  }),

  getters: {},

  actions: {
    async getCars() {
      this.loading = true;

      this.loading = false;
    },

    async addCar() {
      this.loading = true;

      this.loading = false;
    },

    async removeCar() {
      this.loading = true;

      this.loading = false;
    },

    async updateCar() {
      this.loading = true;

      this.loading = false;
    },
  },
});
