<template>
  <div>
    <section class="bg-login">
      <Header />
      <form
        class="form-signin"
        @submit.prevent="signin"
      >
        <div class="ms-logo mb-2">
          <h1
            class="m-0 navbar-brand mx-auto"
            href="#"
          >
            MapleStory
          </h1>
        </div>
        <label for="inputEmail">帳號</label>
        <input
          id="inputEmail"
          v-model="user.username"
          type="email"
          class="form-control mb-2"
          placeholder="Email address"
          required
          autofocus
        >
        <label for="inputPassword">密碼</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control mb-2"
          placeholder="Password"
          required
        >
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-lg btn-maple"
            type="submit"
          >
            登入
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { apiSignin } from '@/api';
import Header from '../components/Header.vue';

export default {
  name: 'Login',
  components: {
    Header,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async signin() {
      // const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      // const vm = this;
      // vm.$http.post(api, vm.user).then((response) => {
      //   if (response.data.success) {
      //     const { token } = response.data;
      //     const { expired } = response.data;
      //     console.log(token, expired);
      //     document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      //     const path = '/admin/products';
      //     if (vm.$route.path !== path) {
      //       vm.$router.push(path);
      //     }
      //   }
      // });
      const response = await apiSignin(this.user);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      if (this.$route.path !== '/admin/products') {
        this.$router.push('/admin/products');
      }
    },
  },
};
</script>

<style scoped lang="scss">
section.bg-login {
  background-image: url(../assets/images/Banner/hana.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  padding-top: 130px;
  .form-signin {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.65);
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    @media (min-width: 576px) {
      max-width: 500px;
      padding: 30px 30px;
    }
    @media (min-width: 768px) {
      margin-top: 48px;
    }
    .ms-logo .navbar-brand {
      display: block;
      background-image: url(../assets/images/MapleStory.svg);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      height: 120px;
      text-indent: 101%;
      overflow: hidden;
      white-space: nowrap;
      @media (min-width: 576px) {
        height: 150px;
      }
    }
    label {
      font-weight: 800;
      letter-spacing: 1px;
    }
    .form-control {
      position: relative;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      font-size: 16px;
      &:focus {
        z-index: 2;
        box-shadow: 0 0 0;
        border: 1px solid #274878;
        outline: none;
      }
    }
    .btn {
      margin-top: 8px;
      padding-left: 22px;
      padding-right: 22px;
      @media (max-width: 575px) {
        width: 100%;
      }
    }
  }
}
</style>
