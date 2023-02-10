import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName:"router-com" */'../views/home/homeComponents.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:"router-com" */'../views/detail/detailComponents.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:"router-com" */'../views/detail/detailComponents.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName:"router-com" */'../views/my/myComponents.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
