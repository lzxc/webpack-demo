const state = {
  routes: []
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = routes
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
