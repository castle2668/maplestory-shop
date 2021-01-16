<template>
  <div id="app">
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image" />
      </template>
    </loading>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';

.loading-image {
  background-image: url(./assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}
</style>
