<template>
  <div>
    <Header />
    <Alert />
    <main>
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
          <form
            class="col-lg-10"
            @submit.prevent="createOrder"
          >
            <div class="form-group">
              <label for="useremail">
                <i class="fas fa-envelope" />
                Email (*)
              </label>
              <input
                id="useremail"
                v-model="form.user.email"
                v-validate="'required|email'"
                type="email"
                class="form-control"
                name="email"
                placeholder="請輸入 Email"
                :class="{'is-invalid': errors.has('email')}"
                :disabled="isDisabled"
              >
              <span
                v-if="errors.has('email')"
                class="text-danger"
              >
                {{ errors.first('email') }}
              </span>
            </div>

            <div class="form-group">
              <label for="username">
                <i class="fas fa-user" />
                收件人姓名 (*)
              </label>
              <input
                id="username"
                v-model="form.user.name"
                v-validate="'required'"
                type="text"
                class="form-control"
                name="name"
                placeholder="輸入姓名"
                :class="{'is-invalid': errors.has('name')}"
                :disabled="isDisabled"
              >
              <span
                v-if="errors.has('name')"
                class="text-danger"
              >必須輸入姓名</span>
            </div>

            <div class="form-group">
              <label for="usertel">
                <i class="fas fa-phone" />
                收件人電話 (*)
              </label>
              <input
                id="usertel"
                v-model="form.user.tel"
                v-validate="'required'"
                type="tel"
                class="form-control"
                placeholder="請輸入電話"
                name="userTel"
                :class="{'is-invalid': errors.has('userTel')}"
                :disabled="isDisabled"
              >
              <span
                v-if="errors.has('userTel')"
                class="text-danger"
              >電話欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">
                <i class="fas fa-map-marker-alt" />
                收件人地址 (*)
              </label>
              <input
                id="useraddress"
                v-model="form.user.address"
                v-validate="'required'"
                type="text"
                class="form-control"
                name="address"
                placeholder="請輸入地址"
                :class="{'is-invalid': errors.has('address')}"
                :disabled="isDisabled"
              >
              <span
                v-if="errors.has('address')"
                class="text-danger"
              >地址欄位不得留空</span>
            </div>

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
            <div class="text-right">
              <button
                class="btn btn-maple btn-lg"
                :disabled="isDisabled"
              >
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Alert from '../components/shared/AlertMessage.vue';

export default {
  name: 'CustomerOrder',
  components: {
    Header,
    Footer,
    Alert,
  },
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
    ...mapGetters(['cart']),
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
    ...mapActions(['getCart']),
    removeCartItem(id) {
      this.$store.dispatch('removeCart', id);
    },
    addCouponCode() {
      this.$store.dispatch('addCouponCode', this.coupon_code);
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(url, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(`/customerCheckout/${response.data.orderId}`);
            }
            vm.$store.dispatch('updateLoading', false);
          });
        }
      });
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
};
</script>

<style scope lang="scss">
main {
  margin-top: 69px;
}

.loading-image {
  background-image: url(../assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}

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
