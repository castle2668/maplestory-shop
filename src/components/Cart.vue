<template>
  <div>
    <a type='button' class='btn btn-cart' data-toggle='modal' data-target='#cartModal'>
      <span class="badge-cart">{{ cart.carts.length }}</span>
      <img src="../assets/images/GIFs/cart.gif" alt />
    </a>
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">購物車</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row d-flex justify-content-center" v-if="cart.carts.length !== 0">
              <div class="col-12">
                <table class="table">
                  <thead class="thead-light">
                    <th></th>
                    <th>商品名稱</th>
                    <th>數量</th>
                    <th>單價</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-maple btn-sm"
                          @click="removeCartItem(item.id)"
                          style="width:32px; height:30px; overflow:hidden"
                        >
                          <i class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"></i>
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                      </td>
                      <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                      <td
                        class="align-middle text-right"
                        :class="{'text-success': item.coupon}"
                      >{{ item.final_total | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總金額</td>
                      <td class="text-right">{{ cart.total | currency }}</td>
                    </tr>
                    <tr v-if="cart.total !== cart.final_total">
                      <td colspan="3" class="text-right text-success">折扣價</td>
                      <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                    </tr>
                  </tfoot>
                </table>
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    v-model="coupon_code"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-maple" type="button"
                    @click="addCouponCode">套用優惠碼</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center text-moderate" v-else>
              <p class="align-middle">
                <i class="fas fa-shopping-cart fa-5x"></i>
              </p>
              <p class="h3 align-middle mb-0">購物車還沒有任何東西哦！</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">再逛逛</button>
            <a @click.prevent="goCheckout" class="btn btn-maple text-white">結帳去</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Cart',
  data() {
    return {
      product: {},
      status: {
        loadingItem: '',
      },
      cart: {
        carts: [],
      },
      coupon_code: '',
    };
  },
  methods: {
    goCheckout() {
      $('#cartModal').modal('hide');
      const path = '/customerOrder';
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        vm.cart = response.data.data;
      });
    },
    removeCartItem(id) {
      const vm = this;
      vm.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', '產品刪除成功', 'success');
          vm.isLoading = false;
          vm.getCart();
          vm.$bus.$emit('cartCreate:push');
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
        }
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', '優惠碼套用成功', 'success');
          vm.getCart();
          vm.$bus.$emit('cartCreate:push');
        } else if (response.data.message === '找不到優惠券!') {
          vm.isLoading = false;
          this.$bus.$emit('message:push', '沒有這張優惠卷', 'danger');
        } else if (response.data.message === '優惠券無法無法使用或已過期') {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', '優惠券無法無法使用或已過期', 'danger');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('cartCreate:push', () => {
      vm.getCart();
    });
  },
};
</script>

<style scoped lang='scss'>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
.btn-cart {
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 999;
  .badge-cart {
    background: #c1170c;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 10px;
    right: 30px;
    color: #fff;
    text-align: center;
  }
}
</style>
