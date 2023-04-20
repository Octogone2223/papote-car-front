<template>
  <div style="height: calc(100% - 58px - 2rem)" v-if="currentUser">
    <div class="profil-view">
      <div class="avatar col center">
        <Avatar :label="getInitials" size="xlarge" class="avatar"
          style="background: var(--primary-color); color: white" />
        <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
      </div>
    </div>

    <TabMenu :model="items" class="profile" role="navigation" aria-label="Profil">
      <template #item="{ item }">
        <a class="p-menuitem-link" @click="currentTab = item.tab" role="tab" :aria-selected="currentTab === item.tab"
          :aria-controls="item.tab">
          {{ item.label }}
        </a>
      </template>
    </TabMenu>

    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentTab === 'details'">
        <div>
          <div class="col">
            <label for="lastName">Nom</label>
            <InputText type="text" id="lastName" v-model="details.lastName" :class="{
              'p-invalid': v$.user.lastName.$error,
            }" @keydown.enter="() => handleUpdateUser" autocomplete="family-name" aria-describedby="lastNameError" />
            <span role="alert" id="lastNameError">
              <ErrorsHandler :errors="v$.user.lastName.$errors" />
            </span>
          </div>
          <div class="col">
            <label for="firstName">Prénom</label>
            <InputText type="text" id="firstName" v-model="details.firstName" :class="{
              'p-invalid': v$.user.firstName.$error,
            }" @keydown.enter="() => handleUpdateUser" autocomplete="given-name" aria-describedby="firstNameError" />
            <span role="alert" id="firstNameError">
              <ErrorsHandler :errors="v$.user.firstName.$errors" />
            </span>
          </div>
          <div class="col">
            <label for="email">Email</label>
            <InputText type="text" id="email" v-model="details.email" :class="{
              'p-invalid': v$.user.email.$error,
            }" @keydown.enter="() => handleUpdateUser" autocomplete="email" aria-describedby="emailError" />
            <span role="alert" id="emailError">
              <ErrorsHandler :errors="v$.user.email.$errors" />
            </span>
          </div>
          <div class="col">
            <label for="phone">Téléphone</label>
            <InputText type="text" id="phone" v-model="details.phone" :class="{
              'p-invalid': v$.user.phone.$error,
            }" @keydown.enter="() => handleUpdateUser" autocomplete="tel" aria-describedby="phoneError" />
            <span role="alert" id="phoneError">
              <ErrorsHandler :errors="v$.user.phone.$errors" />
            </span>
          </div>
          <div class="col">
            <p>Véhicules</p>
            <Button class="p-button-outlined" label="Voir mes méhicules" @click="$router.push({ name: 'board-vehicles' })"
              tabindex="0" />
          </div>
        </div>
      </div>

      <div v-else-if="currentTab === 'password'" class="col">
        <div class="col">
          <label for="newPassword">Nouveau mot de passe</label>
          <InputText type="password" id="newPassword" v-model="password.newPassword" :class="{
            'p-invalid': v$.password.newPassword.$error,
          }" autocomplete="new-password" aria-describedby="newPasswordError" />
          <span role="alert" id="newPasswordError">
            <ErrorsHandler :errors="v$.password.newPassword.$errors" />
          </span>
        </div>
        <div class="col">
          <label for="confirmNewPassword">Confirmation du mot de passe</label>
          <InputText type="password" id="confirmNewPassword" v-model="password.confirmNewPassword" :class="{
            'p-invalid': v$.password.confirmNewPassword.$error,
          }" autocomplete="new-password" aria-describedby="confirmNewPasswordError" />
          <span role="alert" id="confirmNewPasswordError">
            <ErrorsHandler :errors="v$.password.confirmNewPassword.$errors" />
          </span>
        </div>
        <Button label="Appliquer" style="margin-top: 1rem" @click="handleUpdatePassword" tabindex="0" />
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
        `Le mot de passe doit faire au moins 6 caractères`,
        minLengthR(6)
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
  height: 300px;
  background: var(--surface-100);
  border: var(--primary-color) dashed 1px;

  >.avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
