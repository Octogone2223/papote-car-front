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
import { IConversation } from '@/types';

const chats = ref<IConversation[]>([]);

onMounted(async () => {
  chats.value = await chatApi.getRooms();
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
