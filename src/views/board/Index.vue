<template>
  <div
    style="
      height: calc(100% - 58px);
      width: 100%;
      overflow-y: scroll;
      padding: 1rem;
    "
  >
    <router-view></router-view>
  </div>

  <TabMenu :model="menu" class="tabmenu" />
</template>

<script setup lang="ts">
const menu = [
  { icon: 'pi pi-search', to: 'search' },
  { icon: 'pi pi-comments', to: 'messages' },
  { icon: 'pi pi-plus-circle', to: 'publier' },
  { icon: 'pi pi-car' },
  { icon: 'pi pi-user' },
];
</script>

<style scoped lang="scss">
.tabmenu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
}
</style>
