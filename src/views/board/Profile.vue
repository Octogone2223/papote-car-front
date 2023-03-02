<template>
  <div style="height: calc(100vh - 58px - 2rem)">
    <div class="profil-view">
      <div class="avatar col center">
        <Avatar
          label="A"
          size="xlarge"
          class="avatar"
          style="background: var(--primary-color); color: white"
        />
        <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
      </div>
    </div>

    <TabMenu :model="items" class="profile">
      <template #item="{ item }">
        <a class="p-menuitem-link" @click="currentTab = item.tab">{{
          item.label
        }}</a>
      </template>
    </TabMenu>

    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentTab === 'details'">
        <div>
          <div class="col">
            <p>Description</p>
            <InputText
              type="text"
              v-model="details.description"
              :class="{
                'p-invalid': v$.user.description.$error,
              }"
              @keydown.enter="() => handleUpdateCar"
            />
            <ErrorsHandler :errors="v$.user.description.$errors" />
          </div>
          <div class="col">
            <p>Nom</p>
            <InputText
              type="text"
              v-model="details.lastName"
              :class="{
                'p-invalid': v$.user.lastName.$error,
              }"
              @keydown.enter="() => handleUpdateCar"
            />
            <ErrorsHandler :errors="v$.user.lastName.$errors" />
          </div>
          <div class="col">
            <p>Prénom</p>
            <InputText
              type="text"
              v-model="details.firstName"
              :class="{
                'p-invalid': v$.user.firstName.$error,
              }"
              @keydown.enter="() => handleUpdateCar"
            />
            <ErrorsHandler :errors="v$.user.firstName.$errors" />
          </div>
          <div class="col">
            <p>Email</p>
            <InputText
              type="text"
              v-model="details.email"
              :class="{
                'p-invalid': v$.user.email.$error,
              }"
              @keydown.enter="() => handleUpdateCar"
            />
            <ErrorsHandler :errors="v$.user.email.$errors" />
          </div>
          <div class="col">
            <p>Téléphone</p>
            <InputText
              type="text"
              v-model="details.phone"
              :class="{
                'p-invalid': v$.user.phone.$error,
              }"
              @keydown.enter="() => handleUpdateCar"
            />
            <ErrorsHandler :errors="v$.user.phone.$errors" />
          </div>
          <div class="col">
            <p>Véhicules</p>
            <Button
              class="p-button-outlined"
              label="Voir mes méhicules"
              @click="isShowingEditVehiculeModal = true"
            />
          </div>
          <div class="col">
            <Button
              label="Appliquer"
              style="margin: 1rem 0"
              @click="handleUpdateUser"
            />
          </div>
        </div>
      </div>

      <div v-else-if="currentTab === 'password'" class="col">
        <div class="col">
          <p>Mot de passe actuel</p>
          <InputText type="text" />
        </div>
        <div class="col">
          <p>Nouveau mot de passe</p>
          <InputText type="text" />
        </div>
        <div class="col">
          <p>Confirmation du mot de passe</p>
          <InputText type="text" />
        </div>

        <Button label="Appliquer" style="margin-top: 1rem" />
      </div>
    </transition>

    <Dialog
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      header="Mes véhicules"
      v-model:visible="isShowingEditVehiculeModal"
      :modal="true"
    >
      <DataTable
        :value="cars"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        style="width: 100%"
      >
        <Column field="model" header="Modèle"></Column>
        <Column field="brand" header="Marque"></Column>
        <Column field="place" header="Places"></Column>
        <Column field="color" header="Couleur"></Column>

        <template #empty>Aucun véhicule, pensez à en ajouter ! </template>
      </DataTable>

      <div v-if="isShowingAddVehiculeContent">
        <div class="col">
          <p>Marque</p>
          <InputText
            type="text"
            v-model="carDetails.brand"
            :class="{
              'p-invalid': v$.car.brand.$error,
            }"
            @keydown.enter="() => handleUpdateCar"
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
            @keydown.enter="() => handleUpdateCar"
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
            @keydown.enter="() => handleUpdateCar"
          />
          <ErrorsHandler :errors="v$.car.place.$errors" />
        </div>
        <div class="col">
          <p>Couleur</p>
          <InputText
            type="text"
            v-model="carDetails.color"
            :class="{
              'p-invalid': v$.car.color.$error,
            }"
            @keydown.enter="() => handleUpdateCar"
          />
          <ErrorsHandler :errors="v$.car.color.$errors" />
        </div>

        <Button
          label="Ajouter"
          style="margin-top: 1rem; width: 100%"
          class="p-button-outlined"
          @click="handleUpdateCar"
        />
      </div>

      <template #footer>
        <Button
          label="Formulaire d'ajout"
          class="p-button-text"
          style="margin-top: 1rem"
          @click="isShowingAddVehiculeContent = !isShowingAddVehiculeContent"
        />

        <Button
          label="OK"
          icon="pi pi-check"
          @click="isShowingEditVehiculeModal = false"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useCarStore, useUserStore } from '@/stores';
import { User } from '@/types';
import { Ref } from '@vue/reactivity';
import { useVuelidate } from '@vuelidate/core';
import {
  required as requiredR,
  email as emailR,
  minLength as minLengthR,
  helpers,
} from '@vuelidate/validators';

const { currentUser } = storeToRefs(useUserStore()) as {
  currentUser: Ref<User>;
};

const items = [
  { label: 'Informations', tab: 'details' },
  { label: 'Mot de passe', tab: 'password' },
];

const currentTab = ref<'password' | 'details'>('details');

const isShowingEditVehiculeModal = ref(false);
const isShowingAddVehiculeContent = ref(false);

const { cars } = storeToRefs(useCarStore());

const details = ref({ ...currentUser.value });
const carDetails = ref({
  brand: '',
  model: '',
  place: 3,
  color: '',
});

const rules = {
  user: {
    description: {},
    email: {
      required: helpers.withMessage(`Un email est requis`, requiredR),
      email: helpers.withMessage(`L'email n'est pas valide`, emailR),
    },
    firstName: {
      required: helpers.withMessage(`Un prénom est requis`, requiredR),
    },
    lastName: {
      required: helpers.withMessage(`Un nom est requis`, requiredR),
    },
    phone: {
      required: helpers.withMessage(
        `Un numéro de téléphone est requis`,
        requiredR
      ),
      minLength: helpers.withMessage(
        `Le numéro de téléphone doit faire au moins 10 caractères`,
        minLengthR(10)
      ),
    },
  },
  car: {
    brand: {
      required: helpers.withMessage(`Une marque est requise`, requiredR),
    },
    model: {
      required: helpers.withMessage(`Un modèle est requis`, requiredR),
    },
    place: {
      required: helpers.withMessage(
        `Un nombre de places est requis`,
        requiredR
      ),
    },
    color: {
      required: helpers.withMessage(`Une couleur est requise`, requiredR),
    },
  },
};

const v$ = useVuelidate(
  rules,
  {
    user: details.value,
    car: carDetails.value,
  },
  {
    $autoDirty: true,
  }
);

const carsStore = useCarStore();

const handleUpdateUser = async () => {
  const isFormValid = await v$.value.user.$validate();

  if (!isFormValid) return;
};

const handleUpdateCar = async () => {
  const isFormValid = await v$.value.car.$validate();

  if (!isFormValid) return;

  await carsStore.addCar(carDetails.value);
};
</script>

<style scoped lang="scss">
.profil-view {
  position: relative;
  height: calc(40%);
  background: var(--surface-100);
  border: var(--primary-color) dashed 1px;

  > .avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
