<template>
  <Button
    label="Retour"
    class="p-button-text"
    @click="$router.go(-1)"
    icon="pi pi-arrow-left"
  />
  <div class="chat">
    <div style="overflow-x: scroll; white-space: nowrap">
      <div class="wrapper">
        <div
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          style="overflow: scroll"
        >
          <div>
            <div
              class="chat-message"
              :class="{
                'chat-message--right': Math.random() < 0.5,
                'chat-message--info': chatMessage.type === 'info',
              }"
            >
              <div>
                <div
                  class="chat-message-username"
                  v-if="chatMessage.type !== 'info'"
                >
                  {{ chatMessage.User.username }}
                </div>
                <div
                  class="chat-message-content"
                  v-if="chatMessage.type === 'text'"
                >
                  {{ chatMessage.content }}
                </div>
                <div
                  class="chat-message-content"
                  v-if="chatMessage.type === 'info'"
                >
                  {{ chatMessage.content }}
                </div>
                <div
                  class="chat-message-content"
                  v-if="chatMessage.type === 'gif'"
                  v-html="chatMessage.content"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="chat-input">
    <InputText v-model="message" />

    <span
      class="pi pi-send"
      style="font-size: 1.5rem; margin: 0 0.75rem 0 1rem; cursor: pointer"
      @click="sendMessage"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { nanoid } from 'nanoid';

export type Message = {
  id: string;
  content: string;
  type: string;
  User: {
    id: string;
    username: string;
  };
};

const { currentUser } = useUserStore();

const message = ref('');

// generateMessages
const chatMessages = ref<Message[]>(
  new Array(10).fill({
    id: nanoid(),
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    type: 'text',
    User: {
      id: nanoid(),
      username: 'John Doe',
    },
  })
);

const sendMessage = async () => {
  if (message.value === '') return;

  message.value = '';
};
</script>

<style lang="scss" scoped>
.chat-input {
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 0.5rem;
  box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));

  span {
    font-size: 1.3rem;
    display: flex;
    place-self: center;
    margin: 0 1rem;
  }

  input {
    width: 100%;
  }
}

.chat {
  width: 100%;

  .wrapper {
    white-space: normal;
    width: 100%;
    padding: 1rem;
  }
}

.chat-message {
  display: flex;
  width: 100%;

  &--right {
    color: black;
    display: flex;
    justify-content: flex-end;

    .chat-message-username {
      text-align: right;
    }

    .chat-message-content {
      background: #81b7f4;
      margin: 0.2rem 0 1rem auto;
    }
  }

  &--info {
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
    margin: 0.5rem 0;

    .chat-message-content {
      color: black;
      background: none;
      margin: 0;
    }
  }

  &-username {
    font-weight: bold;
  }

  &-content {
    background: #e6e6e6;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    margin: 0.2rem 0 1rem 0;
    color: white;
    width: fit-content;
  }
}
</style>

<style>
.emojibutton__active {
  border-radius: 0 !important;
}

.vue3-emojipicker .mt-4 {
  margin-top: 0 !important;
}

.vue3-discord-emojipicker__input::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: white !important;
}

.vue3-discord-emojipicker__emojibutton {
  width: 35px !important;
}
</style>
