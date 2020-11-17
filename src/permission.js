import store from './store'
import router, { defaultRoutes } from './router'

router.beforeEach((to, from, next) => {
  store.commit('permission/SET_ROUTES', defaultRoutes)
  next()
})
