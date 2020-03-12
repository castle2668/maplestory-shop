import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    pagination: {},
    allProducts: [],
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
    getAllProducts(context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('PAGINATION', response.data.pagination);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    allProducts(state) {
      return state.allProducts;
    },
    pagination(state) {
      return state.pagination;
    },
  },
};
