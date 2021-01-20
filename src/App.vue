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
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('global', ['isLoading']),
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
