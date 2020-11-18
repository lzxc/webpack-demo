import withPromise from './withPromise'
import test from './test.vue'

const p = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params)
    }, 5000)
  })
}

const compose = (...fns) => {
  return fns.reduce((a, b) => (...reg) => a(b(...reg)))
}

const normalizeVnode = (vm) => ({
  on: vm.$listeners,
  attr: vm.$attrs,
  scopedSlots: vm.$scopedSlots
})

const withLog = (warpper) => ({
  mounted() {
    console.log('withLog->mounted')
  },
  render(h) {
    return h(warpper, normalizeVnode(this))
  }
})

const composeed = compose(withLog, withPromise(p))
export default composeed(test)
