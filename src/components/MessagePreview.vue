<template>
  <div class="col">
    <h4>{{ author }}</h4>
    <div class="row message-content">
      <p>{{ truncatedContent }}</p>
      <Avatar
        :label="author[0]"
        style="padding: 1.5rem; margin: 0 1rem 0"
        size="large"
      />
      <i class="pi pi-chevron-right" v-if="onclick" @click="onclick"></i>
    </div>
    <Divider
      style="
        background: var(--surface-300);
        height: 1px;
        margin-top: 0 !important;
      "
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
  author: string;
  onclick?: () => void;
}>();

const truncatedContent = computed(() => {
  if (props.content.length > 50) {
    return props.content.slice(0, 50) + '...';
  }
  return props.content;
});
</script>

<style scoped lang="scss">
.message-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
