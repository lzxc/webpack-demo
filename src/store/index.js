import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const modulesName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[modulesName] = modulesFiles(modulePath).default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store

