<template>
  <div class="container">
    <TabMenu
      :model="menu"
      class="menu-mobile"
      v-if="screenWidth <= 1024 && $route.name !== 'board-messages-id'"
    />
    <Menubar
      :model="menuScreenSize"
      class="menu-desktop"
      v-if="screenWidth > 1024"
    />
    <div class="board-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';

const menu = [
  { icon: 'pi pi-search', to: '/search' },
  { icon: 'pi pi-comments', to: '/messages' },
  { icon: 'pi pi-plus', to: '/publier' },
  { icon: 'pi pi-car', to: '/my-travels' },
  { icon: 'pi pi-user', to: '/mon-profil' },
];

const menuScreenSize = [
  { label: 'Rechercher', icon: 'pi pi-search', to: '/search' },
  { label: 'Messages', icon: 'pi pi-comments', to: '/messages' },
  { label: 'Publier un trajet', icon: 'pi pi-plus', to: '/publier' },
  { label: 'Mes voyages', icon: 'pi pi-car', to: '/my-travels' },
  { label: 'Mon profil', icon: 'pi pi-user', to: '/mon-profil' },
];

const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  display: flex;
}

.board-content {
  display: flex;
  max-width: 1024px;
  place-self: center;
  width: inherit;
  padding: 1rem;
  height: 100%;
  background: #f8f9fa;
  flex: 1;

  @media screen and (min-width: 1024px) {
    border: 1px solid #e0e0e0;
    border-width: 0 1px;
  }

  @media screen and (max-width: 1024px) {
    padding: 2rem 2rem 4rem 2rem;
  }
}

button:active {
  color: grey;
}

.menu-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  z-index: 1000;
}

.menu-desktop {
  display: none;
  border-radius: 0;
}

@media (min-width: 1024px) {
  .menu-mobile {
    display: none;
  }

  .menu-desktop {
    display: block;
  }
}
</style>

<style>
.board-content > div {
  width: 100%;
}
</style>
