<script setup lang="ts">
import { useUserStore } from '@/stores';
import { UseClipboard } from '@/composables';
import { userApi } from '@/api';

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

const { currentUser } = storeToRefs(userStore);

const { text, copy, copied } = UseClipboard;

const userGetByApi = ref();
const callApi = async () => (userGetByApi.value = await userApi.getUser('1'));
</script>

<template>
  <HelloWorld msg="vue3 starter" />
  <button @click="userStore.logMe" :disabled="isLogin">
    {{ !isLogin ? 'LOG ME' : 'ALREADY LOG' }}
  </button>

  <br />

  user store : {{ currentUser }}

  <button @click="copy()">
    <span v-if="!copied">Copy {{ text }}</span>
    <span v-else>Copied!</span>
  </button>

  <button @click="callApi">CALL API</button>

  <br />

  user from api : {{ userGetByApi }}
</template>

<style lang="scss" scoped></style>
