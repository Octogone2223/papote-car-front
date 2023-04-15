<template>
  <form class="auth-container col" @submit.prevent="() => handleRegister">
    <div class="col center">
      <h1>Bienvenue parmi nous&nbsp;!</h1>

      <transition name="slide-fade" mode="out-in" class="transition-wrapper">
        <div v-if="currentStep === 1">
          <div class="col">
            <label for="firstName">Prénom</label>
            <InputText
              id="firstName"
              v-model="user.firstName"
              aria-describedby="firstName"
              autocomplete="firstName"
              :class="{
                'p-invalid': v$.user.firstName.$error,
              }"
              @keydown.enter="() => handleRegister"
            />
            <ErrorsHandler :errors="v$.user.firstName.$errors" />
          </div>

          <div class="col">
            <label for="lastName">Nom</label>
            <InputText
              id="lastName"
              v-model="user.lastName"
              aria-describedby="lastName"
              @keydown.enter="() => handleRegister"
              autocomplete="lastName"
              :class="{
                'p-invalid': v$.user.lastName.$error,
              }"
            />
            <ErrorsHandler :errors="v$.user.lastName.$errors" />
          </div>

          <div class="col">
            <label for="username">Nom d'utilisateur</label>
            <InputText
              id="username"
              v-model="user.username"
              aria-describedby="username"
              @keydown.enter="() => handleRegister"
              autocomplete="username"
              :class="{
                'p-invalid': v$.user.username.$error,
              }"
            />
            <ErrorsHandler :errors="v$.user.username.$errors" />
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
              @keydown.enter="() => handleRegister"
              autocomplete="email"
              :class="{
                'p-invalid': v$.user.email.$error,
              }"
            />
            <ErrorsHandler :errors="v$.user.email.$errors" />
          </div>

          <div class="col">
            <label for="phone">Téléphone</label>
            <InputText
              id="phone"
              type="phone"
              v-model="user.phone"
              aria-describedby="phone"
              @keydown.enter="() => handleRegister"
              autocomplete="phone"
              :class="{
                'p-invalid': v$.user.phone.$error,
              }"
            />
            <ErrorsHandler :errors="v$.user.phone.$errors" />
          </div>
        </div>

        <div v-else-if="currentStep === 3">
          <div class="col">
            <label for="password">Mot de passe</label>
            <InputText
              id="password"
              type="password"
              v-model="user.password"
              aria-describedby="password"
              @keydown.enter="() => handleRegister"
              autocomplete="password"
              :class="{
                'p-invalid': v$.user.password.$error,
              }"
            />
            <ErrorsHandler :errors="v$.user.password.$errors" />
          </div>

          <div class="col">
            <label for="confirmPassword">Confirmation du mot de passe</label>
            <InputText
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              aria-describedby="confirmPassword"
              autocomplete="confirmPassword"
              :class="{
                'p-invalid': v$.confirmPassword.$error,
              }"
            />
            <ErrorsHandler :errors="v$.confirmPassword.$errors" />
          </div>
        </div>
      </transition>
    </div>

    <StepIndicator
      :steps="3"
      @change-step="(step: number) => changeStep(step)"
      @complete="() => handleRegister()"
      :handler="handleValidation"
    />
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { useVuelidate } from '@vuelidate/core';
import {
  required as requiredR,
  email as emailR,
  minLength as minLengthR,
  helpers,
} from '@vuelidate/validators';
import { UseTransitionOnStep } from '@/composables';
import { toast } from 'vue-sonner';
import router from '@/router';

const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;

const user = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  username: '',
});

const confirmPassword = ref('');

/* VALIDATIONS */
const alreadyExists = ref(false);
const rules = {
  user: {
    firstName: {
      required: helpers.withMessage(`Un prénom est requis`, requiredR),
    },
    lastName: {
      required: helpers.withMessage(`Un nom est requis`, requiredR),
    },
    username: {
      required: helpers.withMessage(
        `Un nom d'utilisateur est requis`,
        requiredR
      ),
    },
    phone: {
      required: helpers.withMessage(
        `Un numéro de téléphone est requis`,
        requiredR
      ),
    },
    email: {
      required: helpers.withMessage(`Un email est requis`, requiredR),
      email: helpers.withMessage(`L'email n'est pas valide`, emailR),
      exist: helpers.withMessage(
        `<u>Cet email est déjà utilisé, se connecter ?</u>`,
        () => {
          return !alreadyExists.value;
        }
      ),
    },
    password: {
      required: helpers.withMessage(`Un mot de passe est requis`, requiredR),
      minLength: helpers.withMessage(
        `Le mot de passe doit contenir au moins 6 caractères`,
        minLengthR(6)
      ),
    },
  },
  confirmPassword: {
    sameAsPassword: helpers.withMessage(
      `Les mots de passe ne correspondent pas`,
      () => {
        return user.value.password === confirmPassword.value;
      }
    ),
  },
};

const v$ = useVuelidate(
  rules,
  { user: user.value, confirmPassword: confirmPassword.value },
  {
    $autoDirty: true,
  }
);

const userStore = useUserStore();
const handleRegister = async () => {
  await userStore
    .register(user.value)
    .then(async () => {
      toast.success('Un mail de confirmation vous a été envoyé');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push({ name: 'login' });
    })
    .catch((err) => {
      if (err.response.status === 409) {
        alreadyExists.value = true;
        changeStep(2);
        v$.value.user.email.$touch();
        toast.error('Cet email est déjà utilisé');
      }
    });
};

const handleValidation = async () => {
  let isFormCorrect;
  v$.value.$reset();

  if (currentStep.value === 1) {
    isFormCorrect =
      !v$.value.user.firstName.$invalid &&
      !v$.value.user.lastName.$invalid &&
      !v$.value.user.username.$invalid;
  } else if (currentStep.value === 2) {
    isFormCorrect =
      !v$.value.user.email.$invalid && !v$.value.user.phone.$invalid;
  } else if (currentStep.value === 3) {
    isFormCorrect =
      !v$.value.confirmPassword.$invalid && !v$.value.user.password.$invalid;
  }

  if (!isFormCorrect) {
    await v$.value.$validate();
    return false;
  }

  return true;
};
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  height: 100%;
  margin: auto;

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
