<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>
    <div class="banner"></div>
    <div class="category container pt-3 pb-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <router-link to="/index" class="text-maple">首頁</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <span v-if="tempCategory===''">所有商品</span>
            <span v-else>{{ tempCategory }}</span>
          </li>
        </ol>
      </nav>
      <div class="row">
        <section class="col-12 col-lg-3">
          <div class="d-flex d-lg-block flex-wrap justify-content-between sticky-list">
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = ''"
              :class="{'active': tempCategory === ''}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../assets/images/GIFs/pig.gif" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>所有商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '熱銷商品'"
              :class="{'active': tempCategory === '熱銷商品'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../assets/images/Korean Fan.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>熱銷商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '最新商品'"
              :class="{'active': tempCategory === '最新商品'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../assets/images/Poison Mushroom.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>最新商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '楓葉武器'"
              :class="{'active': tempCategory === '楓葉武器'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../assets/images/MapleScorpio.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>楓葉武器</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '楓葉防具'"
              :class="{'active': tempCategory === '楓葉防具'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../assets/images/MapleShield.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>楓葉防具</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '不速之客'"
              :class="{'active': tempCategory === '不速之客'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img
                    src="../assets/images/Last Unwelcome Guest Dagger (LUK).png"
                    height="50px"
                    alt
                  />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>不速之客</p>
                </div>
              </div>
            </a>
          </div>
        </section>
        <section class="col-12 col-lg-9">
          <h3 v-if="tempCategory" class="py-2 py-lg-0">{{ tempCategory }}</h3>
          <h3 v-else class="py-2 py-lg-0">所有商品</h3>
          <div class="row mt-3">
            <article class="col-md-6 col-lg-4 mb-4" v-for="item in activeProducts" :key="item.id">
              <div class="card border h-100">
                <div class="border-bottom">
                  <span
                    class="badge float-right badge-danger"
                    v-if="item.category === '熱銷商品'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-moderate"
                    v-if="item.category === '最新商品'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-maple"
                    v-if="item.category==='楓葉武器' || item.category ==='楓葉防具'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-dark"
                    v-if="item.category === '不速之客'"
                  >{{ item.category }}</span>
                  <figure
                    class="mt-4 mb-4 item-image"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"
                  ></figure>
                </div>
                <div class="card-body">
                  <h4 class="card-title text-center">
                    <a href="#" class="text-dark font-weight-bold">{{ item.title }}</a>
                  </h4>
                  <p class="card-text text-secondary text-center">{{ item.content }}</p>
                  <div class="d-flex justify-content-center align-items-end">
                    <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                    <del
                      class="h6 text-secondary pr-1"
                      v-if="item.price"
                    >{{ item.origin_price | currency }}</del>
                    <div
                      class="h5 text-maple font-weight-bold"
                      v-if="item.price"
                    >{{ item.price | currency }}</div>
                  </div>
                </div>
                <div class="card-footer d-flex bg-white border-0 pt-0 flex-lg-column flex-xl-row">
                  <router-link
                    :to="`/detail/${item.id}`"
                    class="btn btn-outline-secondary btn-xl-sm w-100 mr-2"
                  >查看更多</router-link>
                  <button
                    type="button"
                    class="btn btn-outline-maple btn-xl-sm ml-auto w-100 mt-lg-2 mt-xl-0"
                    @click="addToCart(item.id)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </article>
          </div>
          <Pagination
            v-bind:childPaginations="pagination"
            @changeCurrentPage="getAllProducts"
            v-if="tempCategory===''"
          ></Pagination>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/shared/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      tempCategory: '',
      pagination: {},
      allProducts: [],
    };
  },
  methods: {
    getAllProducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.allProducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then((response) => {
        if (response.data.message === '已加入購物車') {
          vm.$bus.$emit('message:push', '產品加入購物車成功', 'success');
          vm.$bus.$emit('cartCreate:push');
          vm.isLoading = false;
        } else if (response.data.message === '加入購物車有誤') {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
        }
      });
    },
  },
  computed: {
    activeProducts() {
      const vm = this;
      if (vm.tempCategory === '') { return vm.allProducts; }
      return vm.products.filter((item) => item.category === vm.tempCategory);
    },
  },
  created() {
    this.getAllProducts();
    this.getProducts();
  },
};
</script>

<style scoped lang="scss">
.loading-image {
  background-image: url(../assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}
.banner {
  background-image: url(../assets/images/Banner/mobs.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 30vh;
  @media (min-width: 992px) {
    height: 50vh;
  }
}
.category {
  .sticky-list {
    @media (min-width: 992px) {
      position: sticky !important;
      top: 93px;
    }
  }
  .category-btn {
    border-radius: 5px;
    border: 0.5px solid #ccc;
    margin-bottom: 2%;
    transition: all 0.5s;
    @media (max-width: 366px) {
      width: 49%;
    }
    @media (min-width: 367px) and (max-width: 991px) {
      width: 32%;
    }
    p {
      margin: 0;
      font-weight: bold;
      @media (min-width: 767px) {
        padding-left: 20px;
      }
    }
    &:hover {
      border: 0.5px solid #c1170c;
      box-shadow: 0 1px 5px #c1170c;
    }
    &.active {
      border: 0.5px solid #c1170c;
      box-shadow: 0 2px 10px #c1170c;
    }
  }
  .card {
    transition: all 0.5s;
    box-shadow: 0 1px 3px #000;
    &:hover {
      box-shadow: 0 2px 10px #000;
    }
    .badge {
      font-size: 14px;
      padding: 5px 8px;
      margin-right: 4px;
      margin-top: 4px;
    }
    figure.item-image {
      height: 120px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      @media (max-width: 576px) {
        height: 100px;
      }
    }
    .card-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn-xl-sm {
      @media (min-width: 1200px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
        font-size: 16px;
      }
    }
  }
}
</style>
