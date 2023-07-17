import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'Money',
    component: () => import('@/views/Money.vue')
  },
  {
    path: '/labels',
    name: 'Labels',
    component: () => import('@/views/Labels.vue')
  },
  {
    path: '/labels/edit/:id',
    name: 'EditLabel',
    component: () => import('@/views/EditLabel.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
