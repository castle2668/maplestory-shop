<template>
  <div class="py-5">
    <div class="text-right">
      <button
        class="btn btn-maple"
        @click="openModal(true)"
      >
        建立新優惠券
      </button>
    </div>
    <div class="table-responsive-md mb-3">
      <table class="table border-bottom my-4">
        <thead class="thead-light">
          <tr>
            <th class="text-nowrap">
              名稱
            </th>
            <th class="text-nowrap">
              折扣百分比
            </th>
            <th class="text-nowrap">
              到期日
            </th>
            <th class="text-nowrap">
              是否啟用
            </th>
            <th class="text-nowrap">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in coupons"
            :key="item.id"
          >
            <td class="align-middle text-nowrap">
              {{ item.title }}
            </td>
            <td class="align-middle">
              {{ item.percent }}%
            </td>
            <td class="align-middle">
              {{ item.due_date | date }}
            </td>
            <td class="align-middle">
              <span
                v-if="item.is_enabled"
                class="text-success"
              >啟用</span>
              <span
                v-else
                class="text-danger"
              >未啟用</span>
            </td>
            <td class="align-middle">
              <div
                class="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  class="btn btn-sm btn-outline-moderate text-nowrap"
                  @click="openModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-sm btn-outline-maple text-nowrap"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :child-paginations="pagination"
      @changeCurrentPage="getCoupons"
    />
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-maple text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>新增優惠券</span>
            </h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入優惠券名稱"
              >
            </div>
            <div class="form-group">
              <label for="couponCode">優惠碼</label>
              <input
                id="couponCode"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
              >
            </div>
            <div class="form-group">
              <label for="dueDate">到期日</label>
              <input
                id="dueDate"
                v-model="due_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                id="percent"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="請輸入折扣百分比"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="is_enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-maple"
              @click="updateCoupon"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除優惠券</span>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券？（刪除後將無法恢復）
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../components/shared/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      pagination: {},
      due_date: new Date(),
    };
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((response) => {
        vm.$store.dispatch('updateLoading', false);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.due_date = new Date();
        vm.tempCoupon = {};
        vm.isNew = true;
      } else {
        vm.tempCoupon = { ...item };
        vm.isNew = false;
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        [vm.due_date] = [dateAndTime];
      }
      $('#couponModal').modal('show');
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      const vm = this;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#couponModal').modal('hide');
          vm.getCoupons();
        } else {
          $('#couponModal').modal('hide');
          vm.getCoupons();
        }
      });
    },
    openDelModal(item) {
      this.tempCoupon = item;
      $('#delCouponModal').modal('show');
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupons();
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupons();
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.loading-image {
  background-image: url(../../assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}
</style>
