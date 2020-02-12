<template>
  <div>
    <Navbar />
    <Alert></Alert>
    <div class="container">
      <div class="row justify-content-center">
        <main role="main" class="col-12">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Alert from '../shared/AlertMessage.vue';

export default {
  components: {
    Navbar,
    Alert,
  },
};
</script>

<style scoped>
main {
  margin-top: 78px;
}
</style>
