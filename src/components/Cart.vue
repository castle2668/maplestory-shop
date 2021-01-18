<template>
  <div>
    <a
      type="button"
      class="btn btn-cart"
      data-toggle="modal"
      data-target="#cartModal"
    >
      <span
        v-if="cart.carts.length"
        class="badge-cart"
      >{{ cart.carts.length }}</span>
      <img
        src="../assets/images/GIFs/cart.gif"
        alt
      >
    </a>
    <div
      id="cartModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="cartModalLabel"
              class="modal-title"
            >
              購物車
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              v-if="cart.carts.length !== 0"
              class="row d-flex justify-content-center"
            >
              <div class="col-12">
                <div class="table-responsive mb-2">
                  <table class="table mb-0">
                    <thead class="thead-light">
                      <th />
                      <th class="text-nowrap">
                        商品名稱
                      </th>
                      <th class="text-nowrap">
                        數量
                      </th>
                      <th class="text-nowrap">
                        小計
                      </th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in cart.carts"
                        :key="item.id"
                      >
                        <td class="align-middle">
                          <button
                            type="button"
                            class="btn btn-outline-maple btn-sm"
                            @click="removeCart(item.id)"
                          >
                            <i class="far fa-trash-alt" />
                          </button>
                        </td>
                        <td class="align-middle">
                          {{ item.product.title }}
                          <div
                            v-if="item.coupon"
                            class="text-success"
                          >
                            已套用優惠券
                          </div>
                        </td>
                        <td class="align-middle responsive-td">
                          <div class="input-group">
                            <button
                              class="btn btn-outline-moderate btn-sm d-none d-sm-block mr-2"
                              @click="minusQty(item.id, item.product.id, item.qty)"
                            >
                              <i class="fas fa-minus" />
                            </button>
                            <select
                              id="qtySelect"
                              class="select-text-center form-control border-moderate"
                              @change="updateQtyBySelect(item.id, item.product.id, $event)"
                            >
                              <option
                                selected
                                disabled
                              >
                                {{ item.qty }}
                              </option>
                              <option
                                v-for="number in 10"
                                :key="number"
                                :value="number"
                              >
                                {{ number }}
                              </option>
                            </select>
                            <button
                              class="btn btn-outline-moderate btn-sm d-none d-sm-block ml-2"
                              @click="addQty(item.id, item.product.id, item.qty)"
                            >
                              <i class="fas fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td
                          class="align-middle text-right"
                          :class="{'text-success': item.coupon}"
                        >
                          {{ item.final_total | currency }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colspan="3"
                          class="text-right"
                        >
                          總金額
                        </td>
                        <td class="text-right">
                          {{ cart.total | currency }}
                        </td>
                      </tr>
                      <tr v-if="cart.total !== cart.final_total">
                        <td
                          colspan="3"
                          class="text-right text-success"
                        >
                          折扣價
                        </td>
                        <td class="text-right text-success">
                          {{ cart.final_total | currency }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="input-group input-group">
                  <input
                    v-model="coupon_code"
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-maple"
                      type="button"
                      @click="addCouponCode"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center text-moderate"
            >
              <div class="align-middle pb-3">
                <img
                  src="../assets/images/penguine.png"
                  height="150px"
                  alt=""
                >
              </div>
              <p
                class="h3 align-middle mb-0"
                style="line-height: 1.4"
              >
                購物車空空的哦！<br>去看看心儀的商品吧
              </p>
            </div>
          </div>
          <div
            v-if="cart.carts.length!==0"
            class="modal-footer"
          >
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              再逛逛
            </button>
            <a
              class="btn btn-maple text-white"
              @click.prevent="goCheckout"
            >結帳去</a>
          </div>
          <div
            v-else
            class="modal-footer"
          >
            <a
              class="btn btn-block btn-maple text-white"
              @click.prevent="goShopping"
            >
              前往購物商城
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';

export default {
  name: 'Cart',
  data() {
    return {
      coupon_code: '',
    };
  },
  computed: {
    ...mapGetters('global', ['cart']),
  },
  created() {
    this.getCart();
  },
  methods: {
    ...mapActions('global', ['getCart']),
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
    removeCart(id) {
      this.$store.dispatch('global/removeCart', id);
    },
    addCouponCode() {
      this.$store.dispatch('global/addCouponCode', this.coupon_code);
    },
    addQty(cid, pid, qty) {
      const newQty = Number(qty) + 1;
      this.$store.dispatch('global/updateQty', { cid, pid, newQty });
    },
    minusQty(cid, pid, qty) {
      const newQty = Number(qty) - 1;
      this.$store.dispatch('global/updateQty', { cid, pid, newQty });
    },
    updateQtyBySelect(cid, pid, $event) {
      const newQty = Number($event.target.value);
      this.$store.dispatch('global/updateQtyBySelect', { cid, pid, newQty });
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
