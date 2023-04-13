<template>
  <div class="container">
    <TabMenu :model="menu" class="menu-mobile" v-if="screenWidth <= 1024 && $route.name !== 'board-messages-id'" />
    <Menubar :model="menuScreenSize" class="menu-desktop"
      v-if="screenWidth > 1024 && $route.name !== 'board-messages-id'" />
    <router-view></router-view>
  </div>
</template>
  
   
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Menubar from 'primevue/menubar';



const menu = [
  { icon: 'pi pi-search', to: '/search' },
  { icon: 'pi pi-comments', to: '/messages' },
  { icon: 'pi pi-car', to: '/my-travels' },
  { icon: 'pi pi-user', to: '/mon-profil' },
];



const menuScreenSize = [
  { label: 'Rechercher', icon: 'pi pi-search', to: '/search' },
  { label: 'Messages', icon: 'pi pi-comments', to: '/messages' },
  { label: 'Mes voyages', icon: 'pi pi-car', to: '/my-travels' },
  { label: 'Mon profil', icon: 'pi pi-user', to: '/mon-profil' },
];



const screenWidth = ref<number>(window.innerWidth);



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
  height: 100vh;
  width: 100%;
  min-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
}



.menu-wrapper {
  width: 100%;
  border-radius: 0;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.2);
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
}




.menu-desktop {
  display: none;
  border-radius: 0;
}



@media (min-width: 1024px) {
  .menu-wrapper {
    width: 100%;
    box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.2);
  }



  .menu-mobile {
    display: none;
  }



  .menu-desktop {
    display: block;
  }
}
</style>