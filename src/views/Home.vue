<script setup lang="ts">
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

const { currentUser } = storeToRefs(userStore);

const userGetByApi = ref();
</script>

<template>
  <HelloWorld msg="vue3 starter" />
  <button @click="userStore.login" :disabled="isLogin">
    {{ !isLogin ? 'LOG ME' : 'ALREADY LOG' }}
  </button>

  <br />

  user store : {{ currentUser }}

  <br />

  user from api : {{ userGetByApi }}
</template>

<style lang="scss" scoped></style>
