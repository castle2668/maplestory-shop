<template>
  <div>
    <header class="fixed-top">
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid container-lg">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="ms-logo">
            <h1 class="m-0">
              <router-link
                to="/index"
                class="navbar-brand ml-auto m-0 p-0"
              >
                MapleStory
              </router-link>
            </h1>
          </div>
          <div
            id="navbarNav"
            class="collapse navbar-collapse"
          >
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <span />
                <router-link
                  to="/admin/products"
                  class="nav-link p-3 py-md-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-box-open" />
                  產品列表
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <router-link
                  to="/admin/orders"
                  class="nav-link p-3 py-md-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-cart-arrow-down" />
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <router-link
                  to="/admin/coupons"
                  class="nav-link p-3 py-md-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-money-check-alt" />
                  優惠券列表
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <a
                  class="nav-link p-3 py-md-2"
                  href="#"
                  @click.prevent="signout"
                >
                  <i class="fas fa-sign-out-alt" />
                  登出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { apiLogout } from '@/api';

export default {
  name: 'Navbar',
  methods: {
    async signout() {
      const vm = this;
      // const url = `${process.env.VUE_APP_APIPATH}/logout`;
      // vm.$http.post(url).then((response) => {
      //   if (response.data.success) {
      //     vm.$router.push('/login');
      //   }
      // });
      const response = await apiLogout();
      if (response.data.success) {
        vm.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  border-bottom: 3px solid #d3d3d3;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  .ms-logo {
    @media (max-width: 992px) {
      margin: 0 auto;
    }
    .navbar-brand {
      background-image: url(../../assets/images/MapleStory.svg);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: left top;
      width: 129.802699896px;
      height: 50px;
      display: block;
      text-indent: 101%;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  li.nav-item {
    float: left;
    position: relative;
    &:hover span{
      position: absolute;
      width: 100%;
      bottom: 0;
      border-bottom: 3px solid #c1170c;
      bottom: -5px;
      @media(max-width: 767px){
        bottom: 0px;
      }
    }
    .nav-link {
      display: block;
      background: transparent;
      font-weight: bold;
      text-decoration: none;
      position: relative;
      &.active,
      &:hover {
        color: #c1170c;
      }
    }
  }
}
</style>
