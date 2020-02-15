<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <main>
      <loading :active.sync="isLoading">
        <template slot="default">
          <div class="loading-image"></div>
        </template>
      </loading>
      <div class='container conform-cart py-5'>
        <div class='text-center'>
          <h2 class="font-weight-bold mb-4 pb-2" v-if="!order.is_paid">確認訂單</h2>
          <h2 class="font-weight-bold mb-4 pb-2" v-else>付款完成，感謝購買！</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="banner" v-if="order.is_paid"></div>
            <form class="mb-3" @submit.prevent="payOrder">
              <table class="table border-bottom mb-5" v-if="!order.is_paid">
                <thead class="thead-light">
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total | currency }}</td>
                  </tr>
                </tfoot>
              </table>
              <div class="text-center" v-if="!order.is_paid">
                <h2 class="font-weight-bold mb-4 pb-2">訂單資訊</h2>
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
                      <span v-else class="text-success">付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right" v-if="order.is_paid === false">
                <router-link to="/index" class="btn btn-outline-maple">取消購買</router-link>
                <button class="btn ml-2 btn-maple">確認付款</button>
              </div>
              <div class="text-right" v-else>
                <router-link to="/index" class="btn btn-outline-maple">
                  回到首頁
                </router-link>
                <router-link to="/category"
                class="btn btn-maple ml-2 ml-md-2">
                  繼續逛逛
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
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
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          vm.$bus.$emit('cartCreate:push');
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId;
    vm.getOrder();
  },
};
</script>

<style scoped lang='scss'>
main {
  margin-top: 76.79px;
}

.conform-cart {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
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
