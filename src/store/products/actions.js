import { apiGetAllProducts, apiGetPageProducts } from '../../api';

export async function getProducts(context) {
  context.commit('global/LOADING', true, { root: true });
  const response = await apiGetAllProducts();
  context.commit('PRODUCTS', response.data.products);
  context.commit('global/LOADING', false, { root: true });
}

export async function getAllProducts(context, page) {
  context.commit('global/LOADING', true, { root: true });
  const response = await apiGetPageProducts(page);
  context.commit('ALLPRODUCTS', response.data.products);
  context.commit('PAGINATION', response.data.pagination);
  context.commit('global/LOADING', false, { root: true });
}
