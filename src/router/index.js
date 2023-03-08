import { createRouter, createWebHashHistory } from 'vue-router'
import { checkToken } from '@/api'

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
  },
  {
    path: '/zc',
    name: 'zc',
    component: () => import('@/views/zc/zcCom.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.path === '/detail') {
    if (localStorage.getItem('bstoken') !== null) {
      checkToken(localStorage.getItem('bstoken')).then((res) => {
        if (res.code === 200) {
          return '/detail'
        } else {
          return '/'
        }
      })
    } else {
      return '/'
    }
  }
})

export default router
