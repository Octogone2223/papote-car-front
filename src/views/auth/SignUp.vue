<template>
  <form class="auth-container col" @submit.prevent="handleRegister">
    <div class="col center">
      <h1>Bienvenue parmi nous&nbsp;!</h1>

      <transition name="slide-fade" mode="out-in" class="transition-wrapper">
        <div v-if="currentStep === 1">
          <div class="col">
            <label for="firstname">Prénom</label>
            <InputText
              id="firstname"
              v-model="user.firstname"
              aria-describedby="firstname"
              @keydown.enter="handleRegister"
              autocomplete="firstname"
            />
          </div>

          <div class="col">
            <label for="lastname">Nom</label>
            <InputText
              id="lastname"
              v-model="user.lastname"
              aria-describedby="lastname"
              @keydown.enter="handleRegister"
              autocomplete="lastname"
            />
          </div>

          <div class="col">
            <label for="username">Nom d'utilisateur</label>
            <InputText
              id="username"
              v-model="user.username"
              aria-describedby="username"
              @keydown.enter="handleRegister"
              autocomplete="username"
            />
          </div>

          <div class="col">
            <small>
              Déjà un compte ?
              <router-link :to="{ name: 'login' }"
                >Me connecter à mon compte</router-link
              >
            </small>
          </div>
        </div>

        <div v-else-if="currentStep === 2">
          <div class="col">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="user.email"
              aria-describedby="email"
              @keydown.enter="handleRegister"
              autocomplete="email"
            />
          </div>

          <div class="col">
            <label for="phone">Téléphone</label>
            <InputText
              id="phone"
              type="phone"
              v-model="user.phone"
              aria-describedby="phone"
              @keydown.enter="handleRegister"
              autocomplete="phone"
            />
          </div>
        </div>

        <div v-else-if="currentStep === 3">
          <div class="col">
            <label for="password">Mot de passe</label>
            <InputText
              id="password"
              v-model="user.password"
              aria-describedby="password"
              @keydown.enter="handleRegister"
              autocomplete="password"
            />
          </div>

          <div class="col">
            <label for="confirmPassword">Confirmation du mot de passe</label>
            <InputText
              id="confirmPassword"
              type="confirmPassword"
              v-model="confirmPassword"
              aria-describedby="confirmPassword"
              @keydown.enter="handleRegister"
              autocomplete="confirmPassword"
            />
          </div>
        </div>
      </transition>
    </div>

    <StepIndicator :steps="3" @change-step="(step) => changeStep(step)" />
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { UseTransitionOnStep } from '@/composables';
const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;

const user = ref({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  phone: '',
  username: '',
});

const confirmPassword = ref('');

const { register } = useUserStore();
const handleRegister = async () => await register(user.value);
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  height: 100%;

  > div:first-child {
    height: 100%;
  }

  .transition-wrapper {
    width: 100%;
  }

  .btn-section {
    margin: auto auto 0 auto;
  }

  h1 {
    margin-bottom: 2rem;
  }

  .transition-wrapper > .col:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.slide-fade-enter-from {
  transform: translateX(v-bind(transitionPxInit));
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-to {
  transform: translateX(v-bind(transitionPx));
  opacity: 0;
}
</style>
