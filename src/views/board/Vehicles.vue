<template>
  <div>
    <h1>Mes véhicules</h1>

    <DataTable
      :value="cars"
      class="p-datatable-sm"
      responsiveLayout="stack"
      style="width: 100%; margin-top: 2rem"
      @row-click="onRowClick"
    >
      <Column field="model" header="Modèle"></Column>
      <Column field="brand" header="Marque"></Column>
      <Column field="place" header="Places"></Column>
      <Column field="color" header="Couleur"></Column>

      <template #empty>Aucun véhicule, pensez à en ajouter ! </template>
    </DataTable>

    <Button
      label="Ajouter un véhicule"
      style="margin-top: 1rem"
      @click="isShowindAddCarModal = true"
    />

    <Dialog
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      header="Ajouter un véhicule"
      v-model:visible="isShowindAddCarModal"
      :modal="true"
      style="padding: 0"
    >
      <div class="col">
        <p>Marque</p>
        <InputText
          type="text"
          v-model="carDetails.brand"
          :class="{
            'p-invalid': v$.car.brand.$error,
          }"
          @keydown.enter="() => handleAddCar"
        />
        <ErrorsHandler :errors="v$.car.brand.$errors" />
      </div>
      <div class="col">
        <p>Modèle</p>
        <InputText
          type="text"
          v-model="carDetails.model"
          :class="{
            'p-invalid': v$.car.model.$error,
          }"
          @keydown.enter="() => handleAddCar"
        />
        <ErrorsHandler :errors="v$.car.model.$errors" />
      </div>
      <div class="col">
        <p>Places</p>
        <InputNumber
          v-model="carDetails.place"
          :class="{
            'p-invalid': v$.car.place.$error,
          }"
          @keydown.enter="() => handleAddCar"
        />
        <ErrorsHandler :errors="v$.car.place.$errors" />
      </div>
      <div class="col">
        <p>Couleur</p>
        <Dropdown
          v-model="carDetails.color"
          :options="carColorsOptions"
          :class="{
            'p-invalid': v$.car.color.$error,
          }"
          @keydown.enter="() => handleAddCar"
        />
        <ErrorsHandler :errors="v$.car.color.$errors" />
      </div>

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-text"
          style="margin-top: 1rem"
          @click="isShowindAddCarModal = false"
        />

        <Button
          label="Ajouter"
          icon="pi pi-check"
          @click="handleAddCar"
          autofocus
        />
      </template>
    </Dialog>

    <Dialog
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      header="Modifier mon véhicule"
      v-model:visible="isShowingEditCarModal"
      :modal="true"
      style="padding: 0"
    >
      <div class="col">
        <p>Marque</p>
        <InputText
          type="text"
          v-model="selectedCar.brand"
          :class="{
            'p-invalid': v$.selectedCar.brand.$error,
          }"
          @keydown.enter="() => handleUpdateCar"
        />
        <ErrorsHandler :errors="v$.selectedCar.brand.$errors" />
      </div>
      <div class="col">
        <p>Modèle</p>
        <InputText
          type="text"
          v-model="selectedCar.model"
          :class="{
            'p-invalid': v$.selectedCar.model.$error,
          }"
          @keydown.enter="() => handleUpdateCar"
        />
        <ErrorsHandler :errors="v$.selectedCar.model.$errors" />
      </div>
      <div class="col">
        <p>Places</p>
        <InputNumber
          v-model="selectedCar.place"
          :class="{
            'p-invalid': v$.selectedCar.place.$error,
          }"
          @keydown.enter="() => handleUpdateCar"
        />
        <ErrorsHandler :errors="v$.selectedCar.place.$errors" />
      </div>
      <div class="col">
        <p>Couleur</p>
        <Dropdown
          v-model="selectedCar.color"
          :options="carColorsOptions"
          :class="{
            'p-invalid': v$.selectedCar.color.$error,
          }"
          @keydown.enter="() => handleUpdateCar"
        />
        <ErrorsHandler :errors="v$.selectedCar.color.$errors" />
      </div>

      <Button
        label="Supprimer"
        icon="pi pi-trash"
        class="p-button-danger p-button-outlined"
        style="margin-top: 1rem; width: 100%"
        @click="handleRemoveCar"
      />

      <template #footer>
        <Button
          label="Annuler"
          class="p-button-text"
          style="margin-top: 1rem"
          @click="isShowingEditCarModal = false"
        />

        <Button
          label="Modifier"
          icon="pi pi-check"
          @click="handleUpdateCar"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useCarStore } from '@/stores';
import { PatchUserCarInput } from '@/types/inputs';
import useVuelidate from '@vuelidate/core';
import { required as requiredR, helpers } from '@vuelidate/validators';
import { DataTableRowEditCancelEvent } from 'primevue/datatable';

onMounted(async () => {
  await carsStore.getCars();
});

const isShowindAddCarModal = ref(false);
const isShowingEditCarModal = ref(false);
const carColorsOptions = [
  'black',
  'white',
  'yellow',
  'pink',
  'green',
  'darkBlue',
  'blue',
  'grey',
];

const { cars } = storeToRefs(useCarStore());

const selectedCar = ref<PatchUserCarInput>({} as PatchUserCarInput);

const carDetails = ref({
  brand: '',
  model: '',
  place: 3,
  color: '',
});

const generalRules = {
  brand: {
    required: helpers.withMessage(`Une marque est requise`, requiredR),
  },
  model: {
    required: helpers.withMessage(`Un modèle est requis`, requiredR),
  },
  place: {
    required: helpers.withMessage(`Un nombre de places est requis`, requiredR),
  },
  color: {
    required: helpers.withMessage(`Une couleur est requise`, requiredR),
  },
};

const rules = {
  car: generalRules,
  selectedCar: generalRules,
};

const v$ = useVuelidate(
  rules,
  {
    car: carDetails.value,
    selectedCar: selectedCar,
  },
  {
    $autoDirty: true,
  }
);

const carsStore = useCarStore();

const handleAddCar = async () => {
  const isFormValid = await v$.value.car.$validate();

  if (!isFormValid) return;

  await carsStore.addCar(carDetails.value);
  isShowindAddCarModal.value = false;
};

const handleUpdateCar = async () => {
  const isFormValid = await v$.value.selectedCar.$validate();

  if (!isFormValid) return;

  await carsStore.updateCar(selectedCar.value);
  isShowingEditCarModal.value = false;
};

const onRowClick = (event: DataTableRowEditCancelEvent) => {
  isShowingEditCarModal.value = true;
  selectedCar.value = event.data;
};

const handleRemoveCar = async () => {
  await carsStore.removeCar(selectedCar.value.id);
  isShowingEditCarModal.value = false;
};
</script>

<style scoped></style>
