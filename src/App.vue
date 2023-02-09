<script setup lang="ts"></script>

<template>
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600;800&display=swap');

*,
** {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
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

  /* CUSTOM STYLE */
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
