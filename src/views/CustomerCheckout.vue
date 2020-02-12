<template>
  <div>
    <div class='container conform-cart py-5'>
      <div class='text-center'>
        <h2 class="font-weight-bold mb-4 pb-2" v-if="!order.is_paid">確認訂單</h2>
        <h2 class="font-weight-bold mb-4 pb-2" v-else>付款完成，感謝購買！</h2>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="banner" v-if="order.is_paid"></div>
          <form class="mt-4" @submit.prevent="payOrder">
            <table class="table border-bottom mb-4" v-if="!order.is_paid">
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
              <button class="btn btn-outline-maple">取消購買</button>
              <button class="btn btn-maple">確認付款</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId;
    vm.getOrder();
    vm.getCart();
  },
};
</script>

<style scoped lang='scss'>
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
