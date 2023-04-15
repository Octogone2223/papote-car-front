<template>
  <div>
    <h1>Boîte de reception</h1>

    <div v-if="chats && chats.length">
      <MessagePreview
        author="Lilian"
        content="chat.content"
        v-for="chat in chats"
        :onclick="
          () =>
            $router.push({
              name: 'board-messages-id',
              params: { id: chat.id },
            })
        "
      />
    </div>

    <div v-else>
      <p>Vous n'avez pas de messages</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chatApi } from '@/api';

interface Chat {
  id: string;
  messages: {
    content: string;
    userId: string;
  };
}

const chats = ref<Chat[]>([]);

onMounted(async () => {
  chats.value = (await chatApi.getRooms()) as Chat[];

  await chatApi.postMessage('862c3eb2-4d3a-4942-b2cb-42314bed8b77');
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
