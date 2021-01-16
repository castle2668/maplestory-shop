<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid container-lg">
      <div class="row justify-content-center">
        <main
          role="main"
          class="col-12"
        >
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Navbar from './Navbar.vue';
import Alert from '../shared/AlertMessage.vue';

export default {
  components: {
    Navbar,
    Alert,
  },
  created() {
    $(window).click(() => {
      if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-toggler').click();
      }
    });
  },
};
</script>

<style scoped>
main {
  margin-top: 69px;
}
</style>
