import { apiGetAllProducts, apiGetPageProducts } from '../../api';

export async function getProducts(context) {
  // const url = `
  // ${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
  // context.commit('LOADING', true, { root: true });
  // axios.get(url).then((response) => {
  //   context.commit('PRODUCTS', response.data.products);
  //   context.commit('LOADING', false, { root: true });
  // });
  context.commit('global/LOADING', true, { root: true });
  const response = await apiGetAllProducts();
  context.commit('PRODUCTS', response.data.products);
  context.commit('global/LOADING', false, { root: true });
}

export async function getAllProducts(context, page) {
  // const url = `
  // ${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
  // context.commit('LOADING', true, { root: true });
  // axios.get(url).then((response) => {
  //   context.commit('ALLPRODUCTS', response.data.products);
  //   context.commit('PAGINATION', response.data.pagination);
  //   context.commit('LOADING', false, { root: true });
  // });
  context.commit('global/LOADING', true, { root: true });
  const response = await apiGetPageProducts(page);
  context.commit('ALLPRODUCTS', response.data.products);
  context.commit('PAGINATION', response.data.pagination);
  context.commit('global/LOADING', false, { root: true });
}
