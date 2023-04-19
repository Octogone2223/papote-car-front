<template>
  <div>
    <h1>Boîte de reception</h1>

    <div v-if="chats && chats.length">
      <MessagePreview
        :author="
          chat.messages[0].sender.firstName +
          ' ' +
          chat.messages[0].sender.lastName
        "
        :content="chat.messages[0].message"
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

  chatApi.postMessage('fbaee114-62d0-4a19-8a50-f4a68d4c4080');
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
