<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <main>
      <router-view></router-view>
    </main>
    <Cart></Cart>
    <Footer></Footer>
  </div>
</template>

<script>
import $ from 'jquery';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Cart from './Cart.vue';
import Alert from './shared/AlertMessage.vue';

export default {
  components: {
    Header,
    Footer,
    Cart,
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

<style scoped lang="scss">
main {
  margin-top: 69px;
}
</style>
