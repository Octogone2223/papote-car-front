import { carApi } from '@/api';
import { Car } from '@/types';
import { PostUserCarInput } from '@/types/inputs';

export const useCarStore = defineStore({
  id: 'carStore',

  state: () => ({
    cars: [] as Car[],
    loading: false,
  }),

  getters: {},

  actions: {
    async getCars() {
      this.loading = true;

      this.loading = false;
    },

    async addCar(input: PostUserCarInput) {
      this.loading = true;

      const car = await carApi.postUserCar(input);

      this.cars = [...this.cars, car];

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
