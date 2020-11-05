import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home.vue')
  },
  {
    path: '/components-demo',
    name: 'ComponentsDemo',
    component: () => import('views/components-demo/test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
