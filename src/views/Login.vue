<template>
  <div>
    <section class="bg-login">
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

export default {
  name: 'Login',
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
      const vm = this;
      const response = await apiSignin(vm.user);
      if (response.data.success) {
        const { token, expired } = response.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; // 寫入 cookie
        // 存完 cookie 才轉址
        if (vm.$route.path !== '/admin/products') {
          vm.$router.push('/admin/products');
        }
        vm.$store.dispatch('global/updateMessage', {
          message: response.data.message,
          status: 'success',
        });
      } else {
        vm.$store.dispatch('global/updateMessage', {
          message: response.data.message,
          status: 'maple',
        });
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
