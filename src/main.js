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
  // 檢查欲前往的路由是否需要權限
  if (to.meta.requiresAuth) {
    // 需要檢查
    apiUserCheck().then((response) => {
      // 檢查沒過，而且不是要前往 login 頁面，就跳到 Login
      if (to.name !== 'Login' && !response.data.success) {
        next({ name: 'Login' });
      } else {
        // 檢查通過，或者是去 Login 頁面，就直接 next()
        next();
      }
    });
  } else {
    // 不需要檢查
    next();
  }
});
