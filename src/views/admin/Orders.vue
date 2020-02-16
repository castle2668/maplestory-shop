<template>
  <div class="py-4">
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>
    <div class="table-responsive-sm mb-3">
      <table class="table mt-4" v-if="orders.length">
        <thead class="thead-light">
          <tr>
            <th class="text-nowrap">購買時間</th>
            <th class="text-nowrap">Email</th>
            <th class="text-nowrap">購買款項</th>
            <th class="text-nowrap">應付金額</th>
            <th class="text-nowrap">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortOrder" :key="item.id" :class="{'text-secondary': !item.is_paid}">
            <td class="align-middle">{{ item.create_at | date }}</td>
            <td class="align-middle">
              <span v-text="item.user.email" v-if="item.user"></span>
            </td>
            <td class="align-middle">
              <ul class="list-unstyled mt-auto mb-auto">
                <li v-for="(product, i) in item.products" :key="i">
                  <p class="text-nowrap m-0 p-0">
                    {{ product.product.title }} 數量：{{ product.qty }} {{ product.product.unit }}
                  </p>
                </li>
              </ul>
            </td>
            <td class="align-middle text-right">{{ item.total | currency }}</td>
            <td class="align-middle">
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-danger">尚未啟用</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination v-bind:childPaginations="pagination" @changeCurrentPage="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '../../components/shared/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(currentPage = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${currentPage}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
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
