<template>
  <div class="row btn-section">
    <Button
      class="p-button-rounded p-button-text p-button-secondary"
      @click="currentStep > 1 && changeStep(currentStep - 1)"
      icon="pi pi-angle-left"
      iconPos="left"
    />

    <div class="col center">
      {{ 'Etape ' + currentStep + ' sur ' + steps }}
    </div>

    <Button
      class="p-button-rounded"
      @click="
        currentStep === steps ? emits('complete') : changeStep(currentStep + 1)
      "
      icon="pi pi-angle-right"
      iconPos="right"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  steps: number;
  handler?: () => Promise<boolean>;
}>();

const emits = defineEmits<{
  (event: 'change-step', step: number): void;
  (event: 'complete'): void;
}>();

const currentStep = ref(1);
const changeStep = async (step: number) => {
  if (props.handler && !(await props.handler())) return;

  currentStep.value = step;
  emits('change-step', step);
};
</script>

<style scoped lang="scss">
.col.center {
  margin: 0 1rem;
}
</style>
