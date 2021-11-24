<template>
  <div class="pizza-menu">
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'style/main.scss';

.pizza-menu {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
  margin: auto;
  max-width: 60rem;
}
</style>
