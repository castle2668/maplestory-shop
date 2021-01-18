import Vue from 'vue';
// 第三方套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import './bus';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
// Vue
import Vuex from 'vuex';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// 第三方套件
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW',
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});
Vue.use(VueAwesomeSwiper);
swiper.use([Navigation, Pagination, Autoplay]);
// Vue
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
