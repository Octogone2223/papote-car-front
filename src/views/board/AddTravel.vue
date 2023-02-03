<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentStep === 1">
        <h1>D'où partez vous ?</h1>

        <div>
          <GMapAutocomplete />
        </div>
      </div>

      <div v-else-if="currentStep === 2">
        <h1>Où allez vous ?</h1>

        <div>
          <GMapAutocomplete />
        </div>
      </div>
    </transition>

    <StepIndicator
      :steps="2"
      @change-step="(step) => changeStep(step)"
      class="stepper"
    />
  </div>
</template>

<script setup lang="ts">
import { UseTransitionOnStep } from '@/composables';
const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;
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
