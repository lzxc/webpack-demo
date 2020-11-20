import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

export const defaultRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          icon: 'ant-icon-home',
          title: 'Home'
        },
        component: () => import('views/home.vue')
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    meta: {
      icon: 'ant-icon-folder-add',
      title: 'Components'
    },
    children: [
      {
        path: 'test-compose',
        name: 'TestCompose',
        meta: {
          icon: 'ant-icon-switcher',
          title: '测试用组件'
        },
        component: () => import('views/components/test-compose')
      },
      {
        path: 'test-demo',
        name: 'TestDemo',
        meta: {
          icon: 'ant-icon-switcher',
          title: '测试demo'
        },
        component: () => import('views/components/test-demo')
      }
    ]
  },
  {
    path: '/hidden',
    component: Layout,
    hidden: true,
    children: []
  }
]

const router = new VueRouter({
  routes: defaultRoutes
})

export default router
