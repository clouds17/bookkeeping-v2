import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SvgIcon from '@/components/SvgIcon.vue'
import LayoutWrapper from '@/components/LayoutWrapper.vue'
import tagListModel from './models/tagListModel'

Vue.config.productionTip = false

Vue.component('LayoutWrapper', LayoutWrapper)
Vue.component('SvgIcon', SvgIcon)

window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  tagListModel.create(name!);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
