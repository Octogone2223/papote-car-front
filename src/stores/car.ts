import { carApi } from '@/api';
import { Car } from '@/types';
import { PatchUserCarInput, PostUserCarInput } from '@/types/inputs';

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

      this.cars = await carApi.getUserCars();

      this.loading = false;
    },

    async addCar(input: PostUserCarInput) {
      this.loading = true;

      const car = await carApi.postUserCar(input);

      this.cars = [...this.cars, car];

      this.loading = false;
    },

    async removeCar(id: number) {
      this.loading = true;

      await carApi.deleteUserCar(String(id));
      this.cars = this.cars.filter((c) => c.id !== id);

      this.loading = false;
    },

    async updateCar(input: PatchUserCarInput) {
      this.loading = true;

      const { id, ...carData } = input;

      const car = await carApi.updateUserCar(String(id), carData);
      this.cars = this.cars.map((c) => (c.id === id ? car : c));

      this.loading = false;
    },
  },
});
