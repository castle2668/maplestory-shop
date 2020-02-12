import Vue from 'vue';
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
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import 'swiper/dist/css/swiper.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
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
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.use(VueAwesomeSwiper);
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
