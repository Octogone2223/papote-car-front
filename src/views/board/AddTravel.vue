<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <!-- ETAPE 1 -->
      <div v-if="currentStep === 1">
        <h1>D'où partez vous ?</h1>
        <div>
          <GMapAutocomplete />
        </div>
      </div>

      <!-- ETAPE 2 -->
      <div v-else-if="currentStep === 2">
        <h1>Où allez vous ?</h1>
        <div>
          <GMapAutocomplete />
        </div>
      </div>

      <!-- ETAPE 3 -->
      <div v-else-if="currentStep === 3" style="height: 100%">
        <div v-if="!isShowingNewTrajectStep">
          <h1>
            Souhaitez-vous ajouter des étapes que des passagers pourront
            réserver&nbsp;?
          </h1>

          <div style="text-align: center; margin-top: 2rem">
            <Button
              style="border-bottom: dotted"
              label="Ajouter une étape"
              class="p-button-text"
              @click="isShowingNewTrajectStep = true"
            />
          </div>
        </div>
        <div v-else style="height: inherit" class="col">
          <h1>Ajouter une étape</h1>

          <div>
            <GMapAutocomplete />
          </div>

          <Button
            class="btn-section"
            label="Ajouter cette étape"
            @click="isShowingNewTrajectStep = false"
          />
        </div>
      </div>

      <!-- ETAPE 4 -->
      <div v-else-if="currentStep === 4">
        <h1>Récapitulatif de votre trajet</h1>
        <div>
          <h2>Etape 1</h2>
          <p>Adresse de départ</p>
          <p>Adresse d'arrivée</p>
        </div>
      </div>

      <!-- ETAPE 5 -->
      <div v-else-if="currentStep === 5">
        <h1>Configurer votre trajet</h1>
        <div class="col">
          <p>Date de départ</p>
          <Calendar :showTime="true" touch-u-i />
        </div>
        <div class="col">
          <p>Nombre de passagers</p>
          <InputNumber />
        </div>
      </div>

      <!-- ETAPE 6 -->
      <div v-else-if="currentStep === 6">
        <h1>Vérifiez vos informations avant le départ&nbsp;!</h1>
        <div class="col">ETAPE...</div>
      </div>

      <!-- ETAPE 7 -->
      <div v-else-if="currentStep === 7">
        <h1>Vous êtes prêt à partir&nbsp;!</h1>
        <p>
          Vous pouvez consulter votre trajet dans la section "Mes trajets"
          accessible depuis le menu.
        </p>
      </div>
    </transition>

    <StepIndicator
      v-show="!isShowingNewTrajectStep"
      :steps="7"
      @change-step="(step) => changeStep(step)"
      class="stepper"
    />
  </div>
</template>

<script setup lang="ts">
import { UseTransitionOnStep } from '@/composables';
const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;

const isShowingNewTrajectStep = ref(false);
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  > .stepper {
    margin: auto auto 0 auto;
  }
}
.btn-section {
  margin: auto auto 0 auto;
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
