<template>
  <div class="py-5">
    <div class="text-right">
      <button
        class="btn btn-maple"
        @click="openModal(true)"
      >
        建立新產品
      </button>
    </div>
    <div class="table-responsive-sm mb-3">
      <table class="table my-4 border-bottom">
        <thead class="thead-light">
          <tr>
            <th class="text-nowrap">
              分類
            </th>
            <th class="text-nowrap">
              品名
            </th>
            <th class="text-nowrap">
              原價
            </th>
            <th class="text-nowrap">
              售價
            </th>
            <th class="text-nowrap">
              狀態
            </th>
            <th class="text-nowrap">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item) in products"
            :key="item.id"
          >
            <td class="align-middle">
              {{ item.category }}
            </td>
            <td class="align-middle">
              {{ item.title }}
            </td>
            <td class="align-middle text-right">
              {{ item.origin_price | currency }}
            </td>
            <td class="align-middle text-right">
              {{ item.price | currency }}
            </td>
            <td class="align-middle">
              <span
                v-if="item.is_enabled"
                class="text-success"
              >啟用</span>
              <span
                v-else
                class="text-maple"
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
      @changeCurrentPage="getProducts"
    />
    <div
      id="productModal"
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
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <span v-if="status.fileUploading">
                      <i class="fas fa-spinner fa-spin" />
                    </span>
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    style="height: auto;"
                    @change="uploadFile"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
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
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="delProductModal"
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
          <div class="modal-header bg-maple text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-maple">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
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
              @click="deleteProduct"
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
import {
  apiAdminGetProducts,
  apiAdminUpdateProduct,
  apiAdminAddProduct,
  apiAdminDeleteProduct,
  apiAdminUploadFile,
} from '@/api';
import Pagination from '../../components/shared/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
      pagination: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts(page = 1) {
      const vm = this;
      vm.$store.dispatch('global/updateLoading', true);
      const response = await apiAdminGetProducts(page);
      vm.$store.dispatch('global/updateLoading', false);
      vm.products = response.data.products;
      vm.pagination = response.data.pagination;
    },
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProduct = {};
        vm.isNew = true;
      } else {
        vm.tempProduct = { ...item };
        vm.isNew = false;
      }
      $('#productModal').modal('show');
    },
    async updateProduct() {
      const vm = this;
      let response;
      if (!vm.isNew) {
        response = await apiAdminUpdateProduct(vm.tempProduct.id, {
          data: vm.tempProduct,
        });
      } else {
        response = await apiAdminAddProduct({ data: vm.tempProduct });
      }
      if (response.data.success) {
        $('#productModal').modal('hide');
        vm.getProducts();
      } else {
        $('#productModal').modal('hide');
        vm.getProducts();
      }
    },
    openDelModal(item) {
      this.tempProduct = item;
      $('#delProductModal').modal('show');
    },
    async deleteProduct() {
      const vm = this;
      const response = await apiAdminDeleteProduct(vm.tempProduct.id);
      if (response.data.success) {
        $('#delProductModal').modal('hide');
        vm.getProducts();
      } else {
        $('#delProductModal').modal('hide');
        vm.getProducts();
      }
    },
    async uploadFile() {
      const vm = this;
      const uploadFile = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      vm.status.fileUploading = true;
      const response = await apiAdminUploadFile(formData);
      vm.status.fileUploading = false;
      if (response.data.success) {
        vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
      } else {
        this.$store.dispatch('global/updateMessage', { message: response.data.message, status: 'maple' });
      }
    },
  },
};
</script>
