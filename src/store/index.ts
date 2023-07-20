import Vue from 'vue'
import Vuex from 'vuex'

import  recordList  from "@/store/modules/recordList.ts";
import  tagList  from "@/store/modules/tagList.ts";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recordList,
    tagList
  }
})
