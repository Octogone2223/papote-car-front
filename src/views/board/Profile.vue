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
            <InputText type="text" v-model="details.description" />
          </div>
          <div class="col">
            <p>Nom</p>
            <InputText type="text" v-model="details.lastName" />
          </div>
          <div class="col">
            <p>Prénom</p>
            <InputText type="text" v-model="details.firstName" />
          </div>
          <div class="col">
            <p>Email</p>
            <InputText type="text" v-model="details.email" />
          </div>
          <div class="col">
            <p>Téléphone</p>
            <InputText type="text" v-model="details.phone" />
          </div>
          <div class="col">
            <p>Véhicule</p>
            <Button
              class="p-button-outlined"
              :label="!car ? 'Ajouter' : 'Modifier'"
              @click="isShowingEditVehiculeModal = true"
            />
          </div>
          <div class="col">
            <Button label="Appliquer" style="margin: 1rem 0" />
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
      :header="car ? 'Modifier un véhicule' : 'Ajouter un véhicule'"
      v-model:visible="isShowingEditVehiculeModal"
      :modal="true"
    >
      <div class="col">
        <p>Marque</p>
        <InputText type="text" v-model="carDetails.brand" />
      </div>
      <div class="col">
        <p>Modèle</p>
        <InputText type="text" v-model="carDetails.model" />
      </div>
      <div class="col">
        <p>Places</p>
        <InputText type="text" v-model="carDetails.places" />
      </div>
      <div class="col">
        <p>Couleur</p>
        <InputText type="text" v-model="carDetails.color" />
      </div>
      <template #footer>
        <Button
          label="Annuler"
          icon="pi pi-times"
          @click="isShowingEditVehiculeModal = false"
          class="p-button-text"
          style="margin-top: 24px"
        />
        <Button
          :label="car ? 'Modifier' : 'Ajouter'"
          icon="pi pi-check"
          @click="() => ({})"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
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

const car = ref(true);
const isShowingEditVehiculeModal = ref(false);

const details = { ...currentUser.value };
const carDetails = {
  brand: '',
  model: '',
  places: '',
  color: '',
};

const rules = {
  user: {
    email: {
      required: helpers.withMessage(`Un email est requis`, requiredR),
      email: helpers.withMessage(`L'email n'est pas valide`, emailR),
    },
    password: {
      required: helpers.withMessage(`Un mot de passe est requis`, requiredR),
    },
  },
};

const v$ = useVuelidate(
  rules,
  {},
  {
    $autoDirty: true,
  }
);
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
