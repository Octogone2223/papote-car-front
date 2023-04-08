<template>
  <div style="height: calc(100vh - 58px - 2rem)" v-if="currentUser">
    <div class="profil-view">
      <div class="avatar col center">
        <Avatar
          :label="getInitials"
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
              @keydown.enter="() => handleUpdateUser"
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
              @keydown.enter="() => handleUpdateUser"
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
              @keydown.enter="() => handleUpdateUser"
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
              @keydown.enter="() => handleUpdateUser"
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
              @keydown.enter="() => handleUpdateUser"
            />
            <ErrorsHandler :errors="v$.user.phone.$errors" />
          </div>
          <div class="col">
            <p>Véhicules</p>
            <Button
              class="p-button-outlined"
              label="Voir mes méhicules"
              @click="$router.push({ name: 'board-vehicles' })"
            />
          </div>
          <div class="col">
            <Button
              label="Appliquer"
              style="margin: 1rem 0"
              @click="handleUpdateUser"
            />
          </div>
          <Divider
            style="
              background: var(--surface-300);
              height: 1px;
              margin-top: 0 !important;
            "
          />
          <div class="col">
            <Button
              label="Se déconnecter"
              class="p-button-outlined p-button-danger"
              style="margin: 0 0 1rem 0"
              @click="handleLogout"
            />
          </div>
        </div>
      </div>

      <div v-else-if="currentTab === 'password'" class="col">
        <div class="col">
          <p>Nouveau mot de passe</p>
          <InputText
            type="password"
            v-model="password.newPassword"
            :class="{
              'p-invalid': v$.password.newPassword.$error,
            }"
          />
          <ErrorsHandler :errors="v$.password.newPassword.$errors" />
        </div>
        <div class="col">
          <p>Confirmation du mot de passe</p>
          <InputText
            type="password"
            v-model="password.confirmNewPassword"
            :class="{
              'p-invalid': v$.password.confirmNewPassword.$error,
            }"
          />
          <ErrorsHandler :errors="v$.password.confirmNewPassword.$errors" />
        </div>

        <Button
          label="Appliquer"
          style="margin-top: 1rem"
          @click="handleUpdatePassword"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { User } from '@/types';
import { toastCustomError } from '@/utils/errors-handler';
import { Ref } from '@vue/reactivity';
import { useVuelidate } from '@vuelidate/core';
import {
  required as requiredR,
  email as emailR,
  minLength as minLengthR,
  helpers,
} from '@vuelidate/validators';
import { toast } from 'vue-sonner';

const { currentUser } = storeToRefs(useUserStore()) as {
  currentUser: Ref<User>;
};

const items = [
  { label: 'Informations', tab: 'details' },
  { label: 'Mot de passe', tab: 'password' },
];

const currentTab = ref<'password' | 'details'>('details');

const details = ref({ ...currentUser.value });
const password = ref({
  newPassword: '',
  confirmNewPassword: '',
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
  password: {
    newPassword: {
      required: helpers.withMessage(`Un mot de passe est requis`, requiredR),
      minLength: helpers.withMessage(
        `Le mot de passe doit faire au moins 8 caractères`,
        minLengthR(8)
      ),
    },
    confirmNewPassword: {
      sameAsPassword: helpers.withMessage(
        `Les mots de passe ne correspondent pas`,
        () => {
          return (
            password.value.confirmNewPassword === password.value.newPassword
          );
        }
      ),
    },
  },
};
const v$ = useVuelidate(
  rules,
  {
    user: details.value,
    password: password.value,
  },
  {
    $autoDirty: true,
  }
);

const userStore = useUserStore();

const handleUpdateUser = async () => {
  const isFormValid = await v$.value.user.$validate();

  if (!isFormValid) return;

  await userStore
    .update(details.value)
    .catch(() =>
      toastCustomError(
        'Une erreur est survenue lors de la mise à jour de votre profil'
      )
    );

  toast.success('Votre profil a bien été mis à jour');
};

const handleUpdatePassword = async () => {
  const isFormValid = await v$.value.password.$validate();

  if (!isFormValid) return;

  await userStore
    .updatePassword(password.value.newPassword)
    .catch(() =>
      toastCustomError(
        'Une erreur est survenue lors de la mise à jour de votre mot de passe'
      )
    );

  toast.success('Votre mot de passe a bien été mis à jour');
};

const router = useRouter();

const handleLogout = async () => {
  await userStore.logout();

  router.replace({ name: 'login' });

  toast.success('Vous avez bien été déconnecté');
};

const getInitials = computed(() =>
  `${currentUser.value.lastName[0]}${currentUser.value.firstName[0]}`.toUpperCase()
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
