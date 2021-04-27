<template>
  <div>
    <div class="container py-5 cart">
      <div class="text-center">
        <h2 class="font-weight-bold mb-4 pb-2">
          購物車內容
        </h2>
      </div>
      <div class="row d-flex justify-content-center">
        <div
          v-if="cart.carts.length !== 0"
          class="col-lg-10"
        >
          <div class="table-responsive-sm">
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
                      @click="removeCartItem(item.id)"
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
                  <td class="align-middle">
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
                        @change="
                          updateQtyBySelect(item.id, item.product.id, $event)
                        "
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
                    :class="{ 'text-success': item.coupon }"
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
        <div
          v-else
          class="col-lg-10"
        >
          <div class="empty-cart text-center">
            <p class="mb-1">
              購物車沒有東西哦！快去逛逛吧！
            </p>
            <router-link
              to="/category"
              class="text-maple text-decoration-none"
            >
              進入商城
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container cart-form pb-5">
      <div class="text-center">
        <h2 class="font-weight-bold mb-4 pb-2">
          購買資訊
        </h2>
      </div>
      <div class="row justify-content-center">
        <!-- validation-observer 驗證整體表單 -->
        <ValidationObserver
          v-slot="{ invalid }"
          class="col-lg-10"
        >
          <!-- 表單送出改為使用 form submit 的方法 -->
          <form
            @submit.prevent="createOrder"
          >
            <ValidationProvider
              v-slot="{ errors, classes }"
              rules="required|email"
            >
              <div class="form-group">
                <!-- 輸入框 -->
                <label for="userEmail">
                  <i class="fas fa-envelope" />
                  Email (*)
                </label>
                <input
                  id="userEmail"
                  v-model="form.user.email"
                  name="E-mail"
                  type="email"
                  class="form-control"
                  placeholder="請輸入 Email"
                  :class="classes"
                  :disabled="isDisabled"
                >
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, classes }"
              rules="required"
            >
              <div class="form-group">
                <label for="userName">
                  <i class="fas fa-user" />
                  收件人姓名 (*)
                </label>
                <input
                  id="userName"
                  v-model="form.user.name"
                  type="text"
                  class="form-control"
                  name="Name"
                  placeholder="輸入姓名"
                  :class="classes"
                  :disabled="isDisabled"
                >
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, classes }"
              class="form-group"
              rules="required|numeric"
            >
              <div class="form-group">
                <label for="userTel">
                  <i class="fas fa-phone" />
                  收件人電話 (*)
                </label>
                <input
                  id="userTel"
                  v-model="form.user.tel"
                  type="tel"
                  class="form-control"
                  placeholder="請輸入電話"
                  name="Telphone"
                  :class="classes"
                  :disabled="isDisabled"
                >
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, classes }"
              class="form-group"
              rules="required"
            >
              <div class="form-group">
                <label for="userAddress">
                  <i class="fas fa-map-marker-alt" />
                  收件人地址 (*)
                </label>
                <input
                  id="userAddress"
                  v-model="form.user.address"
                  type="text"
                  class="form-control"
                  name="Address"
                  placeholder="請輸入地址"
                  :class="classes"
                  :disabled="isDisabled"
                >
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="form-group">
              <label for="comment">
                <i class="fas fa-comment-dots" />
                留言
              </label>
              <textarea
                id="comment"
                v-model="form.message"
                name
                class="form-control"
                cols="30"
                rows="10"
                :disabled="isDisabled"
              />
            </div>

            <!-- 送出表單使用 @submit 的方法，如果驗證未通過則 disabled 該按鈕 -->
            <div class="text-right">
              <button
                type="submit"
                class="btn btn-maple btn-lg"
                :disabled="isDisabled || invalid"
              >
                送出訂單
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { apiCreateOrder } from '@/api';

export default {
  name: 'CustomerOrder',
  data() {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isDisabled: true,
    };
  },
  computed: {
    ...mapGetters('global', ['cart']),
  },
  watch: {
    cart() {
      const vm = this;
      if (vm.cart.carts.length !== 0) {
        vm.isDisabled = false;
      } else {
        vm.isDisabled = true;
      }
    },
  },
  created() {
    this.getCart();
  },
  methods: {
    ...mapActions('global', ['getCart']),
    removeCartItem(id) {
      this.$store.dispatch('global/removeCart', id);
    },
    addCouponCode() {
      this.$store.dispatch('global/addCouponCode', this.coupon_code);
    },
    // Validate Before Submit
    async createOrder() {
      const vm = this;
      const order = vm.form;
      const response = await apiCreateOrder({ data: order });
      if (response.data.success) {
        vm.$router.push(`/customerCheckout/${response.data.orderId}`);
      }
      vm.$store.dispatch('global/updateLoading', false);
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

<style scoped lang="scss">
.cart {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  .empty-cart {
    background-color: #ededed;
    border-radius: 10px;
    padding: 30px 0px;
  }
  .select-text-center {
    width: 100px !important;
    text-align: justify;
    text-align-last: center;
    border-radius: 0.2rem !important;
    flex: none;
  }
}

.cart-form {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
}
</style>
