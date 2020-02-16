<template>
  <div>
    <a type='button' class='btn btn-cart' data-toggle='modal' data-target='#cartModal'>
      <span class="badge-cart" v-if="cart.carts.length">{{ cart.carts.length }}</span>
      <img src="../assets/images/GIFs/cart.gif" alt />
    </a>
    <div class="modal fade" id="cartModal" tabindex="-1"
    role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
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
                <div class="table-responsive mb-2">
                <table class="table mb-0">
                  <thead class="thead-light">
                    <th></th>
                    <th class="text-nowrap">商品名稱</th>
                    <th class="text-nowrap">數量</th>
                    <th class="text-nowrap">小計</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-maple btn-sm"
                          @click="removeCartItem(item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                      </td>
                      <td class="align-middle responsive-td">
                        <div class="input-group">
                          <button class="btn btn-outline-moderate btn-sm d-none d-sm-block mr-2"
                          @click="minusQty(item.id, item.product.id, item.qty)">
                            <i class="fas fa-minus"></i>
                          </button>
                          <select class="select-text-center form-control border-moderate"
                          id="qtySelect" v-model="item.qty"
                          @change="updateQty(item.id, item.product.id, item.qty)">
                            <option selected disabled>{{ item.qty }}</option>
                            <option :value="number" v-for="number in 10" :key="number">
                              {{ number }}
                            </option>
                          </select>
                          <button class="btn btn-outline-moderate btn-sm d-none d-sm-block ml-2"
                          @click="addQty(item.id, item.product.id, item.qty)">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </td>
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
                </div>
                <div class="input-group input-group">
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
              <div class="align-middle pb-3">
                <img src="../assets/images/penguine.png" height="150px" alt="">
              </div>
              <p class="h3 align-middle mb-0" style="line-height: 1.4">購物車空空的哦！<br>去看看心儀的商品吧</p>
            </div>
          </div>
          <div class="modal-footer" v-if="cart.carts.length!==0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">再逛逛</button>
            <a @click.prevent="goCheckout" class="btn btn-maple text-white">結帳去</a>
          </div>
          <div class="modal-footer" v-else>
            <a @click.prevent="goShopping" class="btn btn-block btn-maple text-white">
              前往購物商城
            </a>
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
    goShopping() {
      $('#cartModal').modal('hide');
      const path = '/category';
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
          vm.getCart();
          vm.$bus.$emit('cartCreate:push');
        } else {
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
          vm.$bus.$emit('message:push', '優惠碼套用成功', 'success');
          vm.getCart();
          vm.$bus.$emit('cartCreate:push');
        } else if (response.data.message === '找不到優惠券!') {
          vm.$bus.$emit('message:push', '沒有這張優惠卷', 'danger');
        } else if (response.data.message === '優惠券無法無法使用或已過期') {
          vm.$bus.$emit('message:push', '優惠券無法無法使用或已過期', 'danger');
        }
      });
    },
    addQty(cid, pid, qty) {
      const newQTY = qty + 1;
      this.updateQty(cid, pid, newQTY);
    },
    minusQty(cid, pid, qty) {
      const newQTY = qty - 1;
      this.updateQty(cid, pid, newQTY);
    },
    updateQty(cid, pid, qty) {
      if (qty <= 0) {
        return;
      }
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: pid,
        qty,
      };
      vm.$http.post(url, { data: cart });
      const url2 = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cid}`;
      vm.$http.delete(url2).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', '產品數量已更新', 'success');
          vm.getCart();
          vm.$bus.$emit('cartCreate:push');
        } else {
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
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
a.btn-cart {
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
table.table{
  .responsive-td{
    @media(min-width: 576px){
      width: 200px;
    }
    .select-text-center {
      width: 80px;
      text-align: justify;
      text-align-last: center;
      border-radius: 0.2rem;
      flex: none;
    }
  }
}
</style>
