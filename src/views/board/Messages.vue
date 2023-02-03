<template>
  <div>
    <h1>Boîte de reception</h1>

    <div>
      <MessagePreview
        :author="message.author"
        :content="message.content"
        v-for="message in fakes"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const fakes = new Array(10).fill({
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
