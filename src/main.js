import Vue from 'vue';

// 第三方套件
// axios + vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// bootstrap
import 'bootstrap';
// vee-validate + vue-i18n
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
// vue-awesome-swiper + swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

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
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// vue-awesome-swiper + swiper
Vue.use(VueAwesomeSwiper);

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
