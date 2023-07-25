import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import SvgIcon from '@/components/SvgIcon.vue';
import LayoutWrapper from '@/components/LayoutWrapper.vue';

Vue.config.productionTip = false;

Vue.component('LayoutWrapper', LayoutWrapper);
Vue.component('SvgIcon', SvgIcon);
const bus = new Vue();
Vue.prototype.$bus = bus;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
