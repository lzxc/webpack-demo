import test from './test.vue'

const p = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params)
    }, 5000)
  })
}
const wrapper = (wrapper, requestFn) => {
  return {
    async  mounted() {
      this.loadding = true
      requestFn({ name: '小明', age: 25 })
        .then((res) => {
          this.result = res
        })
        .catch(() => {
          this.error = true
        })
        .finally(() => {
          this.loadding = false
        })
    },
    data() {
      return {
        loadding: false,
        error: false,
        success: false,
        result: null
      }
    },
    render(h) {
      return h('div', [
        this.loadding ? '加载中..' : null,
        this.error ? '加载失败..' : null,
        h(wrapper, {
          props: {
            result: this.result
          },
          ref: 'test'
        })
      ])
    }
  }
}

export default wrapper(test, p)
