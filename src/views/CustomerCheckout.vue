<template>
  <div>
    <Header />
    <Alert />
    <main>
      <div class="container conform-cart py-5">
        <div
          v-if="!order.is_paid"
          class="text-center"
        >
          <h2 class="font-weight-bold mb-4 pb-2">
            確認訂單
          </h2>
        </div>
        <div
          v-else
          class="text-center"
        >
          <h2 class="font-weight-bold mb-3 pb-2">
            付款完成
          </h2>
          <p class="patronage mb-3">
            感謝您的購買，我們將會盡快出貨！
          </p>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div
              v-if="order.is_paid"
              class="banner"
            />
            <form
              class="mb-3"
              @submit.prevent="payOrder"
            >
              <table
                v-if="!order.is_paid"
                class="table border-bottom mb-5"
              >
                <thead class="thead-light">
                  <th class="text-nowrap">
                    商品名稱
                  </th>
                  <th class="text-nowrap">
                    數量
                  </th>
                  <th class="text-nowrap">
                    單價
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="item in order.products"
                    :key="item.id"
                  >
                    <td class="align-middle">
                      {{ item.product.title }}
                    </td>
                    <td class="align-middle">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.final_total | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colspan="2"
                      class="text-right"
                    >
                      總計
                    </td>
                    <td class="text-right">
                      {{ order.total | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div
                v-if="!order.is_paid"
                class="text-center"
              >
                <h2 class="font-weight-bold mb-4 pb-2">
                  訂單資訊
                </h2>
              </div>
              <table class="table border-bottom">
                <tbody>
                  <tr>
                    <th>Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="!order.is_paid">尚未付款</span>
                      <span
                        v-else
                        class="text-success"
                      >付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="order.is_paid === false"
                class="text-right"
              >
                <router-link
                  to="/"
                  class="btn btn-outline-maple"
                >
                  取消購買
                </router-link>
                <button class="btn ml-2 btn-maple">
                  確認付款
                </button>
              </div>
              <div
                v-else
                class="text-right"
              >
                <router-link
                  to="/"
                  class="btn btn-outline-maple"
                >
                  回到首頁
                </router-link>
                <router-link
                  to="/category"
                  class="btn btn-maple ml-2 ml-md-2"
                >
                  繼續逛逛
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { apiGetOrder, apiPayOrder } from '@/api';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Alert from '../components/shared/AlertMessage.vue';

export default {
  name: 'CustomerCheckout',
  components: {
    Header,
    Footer,
    Alert,
  },
  data() {
    return {
      orderId: '',
      order: {
        user: {},
      },
      step: 1,
    };
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId;
    vm.getOrder();
  },
  methods: {
    async getOrder() {
      const vm = this;
      vm.$store.dispatch('global/updateLoading', true);
      const response = await apiGetOrder(vm.orderId);
      vm.order = response.data.order;
      vm.$store.dispatch('global/updateLoading', false);
    },
    async payOrder() {
      const vm = this;
      vm.$store.dispatch('global/updateLoading', true);
      const response = await apiPayOrder(vm.orderId);
      if (response.data.success) {
        vm.getOrder();
        vm.$bus.$emit('cartCreate:push');
      }
      vm.$store.dispatch('global/updateLoading', false);
    },
  },
};
</script>

<style scoped lang='scss'>
main {
  margin-top: 69px;
}

.conform-cart {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  p.patronage{
    @media(min-width: 321px){
      font-size: 1.2rem;
    }
    @media(min-width: 576px){
      font-size: 1.5rem;
    }
  }
}

.banner {
  background-image: url(../assets/images/Banner/thanks.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;
  height: 300px;
  @media (min-width: 992px) {
    height: 500px;
    background-position: center center;
  }
}
</style>
