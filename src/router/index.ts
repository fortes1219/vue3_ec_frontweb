import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    meta: {
      name: 'Main'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
