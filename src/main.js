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
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
// 引入 SCSS 檔案
import './assets/scss/all.scss';
// Vue
import Vuex from 'vuex';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import App from './App.vue';
import router from './router';
import store from './store';
import { apiUserCheck } from './api';

Vue.config.productionTip = false;

// 第三方套件
// axios + vue-axios
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
// vue-loading-overlay
Vue.component('Loading', Loading);
// vee-validate + vue-i18n
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
// vue-awesome-swiper + swiper
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
  // 是否需要驗證
  if (to.meta.requiresAuth) {
    apiUserCheck().then((response) => {
      // 驗證失敗而且不是去 login 就前往 Login
      if (to.name !== 'Login' && !response.data.success) {
        next({ name: 'Login' });
      } else {
        // 驗證成功或是要去 Login 就放行
        next();
      }
    });
  } else {
    next();
  }
});
