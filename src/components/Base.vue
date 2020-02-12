<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <main>
      <router-view></router-view>
    </main>
    <Cart class="d-none d-sm-block"></Cart>
    <Footer></Footer>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
main {
  margin-top: 78px;
}
</style>
