import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const defaultRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home.vue')
  },
  {
    path: '/components-demo',
    name: 'ComponentsDemo',
    component: () => import('views/components-demo/test.vue')
  },
  {
    path: '/test-compose',
    name: 'TestCompose',
    component: () => import('views/components-demo/test-compose.vue')
  }
]

const router = new VueRouter({
  routes: defaultRoutes
})

export default router
