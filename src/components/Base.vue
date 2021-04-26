<template>
  <div>
    <Header />
    <Alert />
    <main>
      <router-view />
    </main>
    <Cart v-if="showCart" />
    <Footer v-if="showFooter" />
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
  computed: {
    showCart() {
      if (
        this.$route.name === 'Index'
        || this.$route.name === 'Category'
        || this.$route.name === 'Detail'
      ) {
        return true;
      }
      return false;
    },
    showFooter() {
      if (this.$route.name === 'Login') return false;
      return true;
    },
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
