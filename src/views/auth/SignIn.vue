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
        />
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
        />
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
import { useUserStore } from '@/stores';

const user = ref({
  email: '',
  password: '',
});

const { login } = useUserStore();
const handleLogin = async () => await login(user.value);
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
