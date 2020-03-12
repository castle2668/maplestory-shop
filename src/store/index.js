import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';
import productsModules from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    cart: {
      carts: [],
    },
    messages: [], // Alert
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('LOADING', false);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('updateMessage', { message: '產品刪除成功', status: 'success' });
          context.dispatch('getCart');
        } else {
          context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
        }
      });
    },
    // Alert
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('MESSAGES', { message, status, timestamp });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMESSAGEWITHTIMIMG', timestamp);
      }, 5000);
    },
    removeMessage(context, num) {
      context.commit('REMOVEMESSAGE', num);
    },
    buyNow(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
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
      });
    },
    addToCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
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
      });
    },
    updateQty(context, { cid, pid, newQty }) {
      if (newQty <= 0 || newQty > 10) {
        return;
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: pid,
        qty: newQty,
      };
      axios.post(url, { data: cart }).then(() => {
        const url2 = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cid}`;
        axios.delete(url2).then((response) => {
          if (response.data.success) {
            context.dispatch('updateMessage', { message: '產品數量已更新', status: 'success' });
            context.dispatch('getCart');
            context.commit('LOADING', false);
          } else {
            context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
            context.commit('LOADING', false);
          }
        });
      });
    },
    updateQtyBySelect(context, { cid, pid, newQty }) {
      if (newQty <= 0 || newQty > 10) {
        return;
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: pid,
        qty: newQty,
      };
      axios.post(url, { data: cart }).then(() => {
        const url2 = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cid}`;
        axios.delete(url2).then((response) => {
          if (response.data.success) {
            context.dispatch('updateMessage', { message: '產品數量已更新', status: 'success' });
            context.dispatch('getCart');
            context.commit('LOADING', false);
          } else {
            context.dispatch('updateMessage', { message: 'Oops！出現錯誤了！', status: 'danger' });
            context.commit('LOADING', false);
          }
        });
      });
    },
    addCouponCode(context, couponCode) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      context.commit('LOADING', true);
      const coupon = {
        code: couponCode,
      };
      axios.post(url, { data: coupon }).then((response) => {
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
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    // Alert
    MESSAGES(state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp,
      });
    },
    REMOVEMESSAGEWITHTIMIMG(state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1);
        }
      });
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
  modules: {
    productsModules,
  },
});
