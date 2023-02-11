<template>
  <span id="email-error" v-for="error of errors" :key="error.$uid">
    <small class="p-error">{{ error.$message }}</small>
  </span>
</template>

<script setup lang="ts">
import { ErrorObject } from '@vuelidate/core';

defineProps<{
  errors?: ErrorObject[];
}>();
</script>

<style scoped lang="scss">
span {
  color: var(--red-500);
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0.1rem;
}
</style>
