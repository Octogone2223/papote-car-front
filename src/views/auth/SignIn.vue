<template>
  <form class="auth-container col" @submit.prevent="handleLogin">
    <div>
      <h1>Quel est votre email et mot de passe ?</h1>

      <div class="col">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="user.email"
          aria-describedby="email"
          @keydown.enter="handleLogin"
          autocomplete="email"
          :class="{
            'p-invalid': v$.user.email.$error || v$.credentials.$error,
          }"
          @focus="isAnErrorServer = false"
        />
        <ErrorsHandler :errors="v$.user.email.$errors" />

        <ErrorsHandler :errors="v$.credentials.$errors" />
      </div>

      <div class="col">
        <label for="password">Mot de passe</label>
        <InputText
          id="password"
          type="password"
          v-model="user.password"
          aria-describedby="password"
          @keydown.enter="handleLogin"
          autocomplete="password"
          :class="{
            'p-invalid': v$.user.password.$error || v$.credentials.$error,
          }"
          @focus="isAnErrorServer = false"
        />
        <ErrorsHandler :errors="v$.user.password.$errors" />
      </div>

      <div class="col">
        <small>
          Vous n'avez pas de compte ?
          <router-link :to="{ name: 'register' }">Créer un compte</router-link>
        </small>
      </div>
    </div>

    <Button
      label="Se connecter"
      class="p-button-rounded"
      @click="handleLogin"
    />
  </form>
</template>

<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores';
import { useVuelidate } from '@vuelidate/core';
import {
  required as requiredR,
  email as emailR,
  helpers,
} from '@vuelidate/validators';

const user = ref({
  email: '',
  password: '',
});

/* VALIDATIONS */
const isAnErrorServer = ref(false); // Prevent to display server error
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
  credentials: {
    userExist: helpers.withMessage(
      'Email ou mot de passe incorrect',
      () => !isAnErrorServer.value
    ),
  },
};

const v$ = useVuelidate(
  rules,
  { user: user.value, credentials: isAnErrorServer.value },
  {
    $autoDirty: true,
  }
);

const userStore = useUserStore();

const handleLogin = async () => {
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) return;

  await userStore.login(user.value).catch(() => {
    isAnErrorServer.value = true;
  });

  if (userStore.isLogin) {
    router.push({ name: 'board' });
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  height: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  div {
    width: 100%;
  }

  button {
    margin-top: auto;
  }

  h1 {
    margin-bottom: 2rem;
  }

  > div > .col:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
