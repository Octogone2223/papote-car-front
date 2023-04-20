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
        :content="chat.messages[0].message || 'Pas de message'"
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
import { useSocketIO } from '@/composables/use-socket-io';
import { IConversation } from '@/types';

const chats = ref<IConversation[]>([]);

const { socket } = useSocketIO();

onMounted(async () => {
  chats.value = await chatApi.getRooms();

  chats.value.forEach(async (chat) => {
    if (chat.messages.length === 0) {
      const chatContent = {
        roomId: chat.id,
        receiver: chat.userIds[0],
        sender: chat.userIds[1],
        message: '',
      };

      socket.emit('msgToServer', chatContent);
    }
  });
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
