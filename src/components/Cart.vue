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
                          @click="removeCart(item.id)"
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
                          id="qtySelect"
                          @change="updateQtyBySelect(item.id, item.product.id, $event)">
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
      this.$store.dispatch('getCart');
    },
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
    addCouponCode() {
      this.$store.dispatch('addCouponCode', this.coupon_code);
    },
    addQty(cid, pid, qty) {
      const newQty = Number(qty) + 1;
      this.$store.dispatch('updateQty', { cid, pid, newQty });
    },
    minusQty(cid, pid, qty) {
      const newQty = Number(qty) - 1;
      this.$store.dispatch('updateQty', { cid, pid, newQty });
    },
    updateQtyBySelect(cid, pid, $event) {
      const newQty = Number($event.target.value);
      this.$store.dispatch('updateQtyBySelect', { cid, pid, newQty });
    },
  },
  created() {
    this.getCart();
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
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
