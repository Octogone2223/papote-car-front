<template>
  <div>
    <h1>Boîte de reception</h1>

    <div>
      <MessagePreview
        :author="message.author"
        :content="message.content"
        v-for="message in fakes"
        :onclick="
          () =>
            $router.push({
              name: 'board-messages-id',
              params: { id: message.id },
            })
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';

const fakes = new Array(10).fill({
  id: nanoid(),
  author: 'John Doe',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
