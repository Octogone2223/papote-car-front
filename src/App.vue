<script lang="ts" setup>
import { Toaster } from 'vue-sonner';
</script>

<template>
  <router-view :key="$route.fullPath" />
  <Toaster position="top-center" richColors />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600;800&display=swap');

*,
** {
  box-sizing: border-box;
}

* {
  /* SCROLLBAR */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 10px;
    height: 10px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 2px solid transparent;
    color: rgba(0, 0, 0, 0.3);
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  opacity: 1;
  background-image: radial-gradient(#8eccc5 0.5px, transparent 0.5px),
    radial-gradient(#8eccc5 0.5px, #f8f9fa 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.center {
  align-items: center;
  justify-content: center;
}

a {
  color: var(--primary-color);
  text-decoration: underline dashed;
}

.p-tabmenu:not(.profile) {
  width: 100%;

  .p-menuitem-icon {
    font-size: 1rem;
    margin: 0 !important;
  }

  .p-tabmenu-nav {
    place-content: center;
  }

  .p-menuitem-link {
    place-content: center;
  }

  .p-tabmenuitem {
    width: calc(100% / 5);
  }
}

.p-tabmenu.profile {
  width: 100%;

  .p-menuitem-icon {
    font-size: 1rem;
    margin: 0 !important;
  }

  .p-tabmenu-nav {
    place-content: center;
    border: 1px solid var(--surface-300) !important;
    margin-top: 4px;
  }

  .p-menuitem-link {
    place-content: center;
  }

  .p-tabmenuitem {
    width: calc(100% / 2);
  }
}

.p-autocomplete-input {
  width: 100%;
}

.p-timeline-event-opposite {
  flex: initial !important;
}
</style>
