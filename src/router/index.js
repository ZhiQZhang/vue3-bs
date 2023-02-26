import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/detailComponents.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/loginComponent.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
