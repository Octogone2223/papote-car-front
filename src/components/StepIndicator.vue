<template>
  <div class="row btn-section">
    <Button
      class="p-button-rounded p-button-text p-button-secondary"
      @click="changeStep(currentStep === 1 ? steps : currentStep - 1)"
      icon="pi pi-angle-left"
      iconPos="left"
    />

    <div class="col center">
      {{ 'Etape ' + currentStep + ' sur ' + steps }}
    </div>

    <Button
      class="p-button-rounded"
      @click="changeStep(currentStep === steps ? 1 : currentStep + 1)"
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
