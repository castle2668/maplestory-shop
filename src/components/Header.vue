<template>
  <div>
    <header class="fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
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
                  to="/index"
                  class="nav-link p-3 py-lg-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-home" />
                  首頁
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <router-link
                  to="/category"
                  class="nav-link p-3 py-lg-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-box-open" />
                  所有商品
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <router-link
                  to="/customerOrder"
                  class="nav-link p-3 py-lg-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-shopping-cart" />
                  購物車
                </router-link>
              </li>
              <li class="nav-item">
                <span />
                <a
                  class="nav-link p-3 py-lg-2"
                  href="https://github.com/Sealman234"
                >
                  <i class="fab fa-github" />
                  關於作者
                </a>
              </li>
              <li class="nav-item">
                <span />
                <router-link
                  to="/login"
                  class="nav-link p-3 py-lg-2"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <i class="fas fa-user-cog" />
                  登入
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
      background-image: url(../assets/images/MapleStory.svg);
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
      bottom: -5px;
      border-bottom: 3px solid #c1170c;
      @media(max-width: 991px){
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
