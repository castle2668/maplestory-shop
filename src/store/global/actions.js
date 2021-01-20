import router from '@/router';
import {
  apiAddCart, apiAddCoupon, apiGetCart, apiRemoveCart,
} from '../../api';

export function updateLoading(context, status) {
  context.commit('LOADING', status);
}

export async function getCart(context) {
  context.commit('LOADING', true);
  const response = await apiGetCart();
  context.commit('CART', response.data.data);
  context.commit('LOADING', false);
}

export async function removeCart(context, id) {
  context.commit('LOADING', true);
  const response = await apiRemoveCart(id);
  context.commit('LOADING', false);
  if (response.data.success) {
    context.dispatch('updateMessage', { message: '產品刪除成功', status: 'success' });
    context.dispatch('getCart');
  } else {
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
  }
}

// Alert
export function updateMessage(context, { message, status }) {
  const timestamp = Math.floor(new Date() / 1000);
  context.commit('MESSAGES', { message, status, timestamp });
  context.dispatch('removeMessageWithTiming', timestamp);
}
export function removeMessageWithTiming(context, timestamp) {
  setTimeout(() => {
    context.commit('REMOVEMESSAGEWITHTIMIMG', timestamp);
  }, 5000);
}
export function removeMessage(context, num) {
  context.commit('REMOVEMESSAGE', num);
}

// 買完立刻跳轉畫面
export async function buyNow(context, { id, qty }) {
  context.commit('LOADING', true);
  const cart = {
    data: {
      product_id: id,
      qty,
    },
  };
  const response = await apiAddCart(cart);
  if (response.data.message === '已加入購物車') {
    context.dispatch('updateMessage', { message: '產品加入購物車成功', status: 'success' });
    context.dispatch('getCart');
    context.commit('LOADING', false);
    router.push('/customerOrder'); // 買完立刻跳轉畫面
  } else if (response.data.message === '加入購物車有誤') {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
  } else {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
  }
}

// 沒有跳轉畫面
export async function addToCart(context, { id, qty }) {
  context.commit('LOADING', true);
  const cart = {
    data: {
      product_id: id,
      qty,
    },
  };
  const response = await apiAddCart(cart);
  if (response.data.message === '已加入購物車') {
    context.dispatch('updateMessage', { message: '產品加入購物車成功', status: 'success' });
    context.dispatch('getCart');
    context.commit('LOADING', false);
  } else if (response.data.message === '加入購物車有誤') {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
  } else {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
  }
}

export async function updateQty(context, { cid, pid, newQty }) {
  if (newQty <= 0 || newQty > 10) {
    return;
  }
  context.commit('LOADING', true);
  const cart = {
    data: {
      product_id: pid,
      qty: newQty,
    },
  };
  await apiAddCart(cart);
  const response = await apiRemoveCart(cid);
  if (response.data.success) {
    context.dispatch('updateMessage', { message: '產品數量已更新', status: 'success' });
    context.dispatch('getCart');
    context.commit('LOADING', false);
  } else {
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
    context.commit('LOADING', false);
  }
}

export async function updateQtyBySelect(context, { cid, pid, newQty }) {
  if (newQty <= 0 || newQty > 10) {
    return;
  }
  context.commit('LOADING', true);
  const cart = {
    data: {
      product_id: pid,
      qty: newQty,
    },
  };
  await apiAddCart(cart);
  const response = await apiRemoveCart(cid);
  if (response.data.success) {
    context.dispatch('updateMessage', { message: '產品數量已更新', status: 'success' });
    context.dispatch('getCart');
    context.commit('LOADING', false);
  } else {
    context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
    context.commit('LOADING', false);
  }
}

export async function addCouponCode(context, couponCode) {
  context.commit('LOADING', true);
  const coupon = {
    data: {
      code: couponCode,
    },
  };
  const response = await apiAddCoupon(coupon);
  if (response.data.success) {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: '優惠碼套用成功', status: 'success' });
    context.dispatch('getCart');
  } else if (response.data.message === '找不到優惠券!') {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: '沒有這張優惠卷', status: 'danger' });
  } else if (response.data.message === '優惠券無法無法使用或已過期') {
    context.commit('LOADING', false);
    context.dispatch('updateMessage', { message: '優惠券無法無法使用或已過期', status: 'danger' });
  }
}
