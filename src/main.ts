import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import LayoutWrapper from '@/components/LayoutWrapper.vue'

Vue.config.productionTip = false

Vue.component('LayoutWrapper', LayoutWrapper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
