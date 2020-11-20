const wrapper = (requestFn) => {
  return function warpper(wrapper) {
    return {
      async  mounted() {
        this.$refs.test.$watch('requestParams', this.request.bind(this), {
          immediate: true,
          deep: true
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
      methods: {
        request() {
          this.loadding = true
          const { requestParams } = this.$refs.test
          return requestFn({ ...requestParams, name: '小明', age: 25 })
            .then((res) => {
              this.result = res
            })
            .catch(() => {
              this.error = true
            })
            .finally(() => {
              this.loadding = false
            })
        }
      },
      render(h) {
        return h('div', [
          this.loadding ? '加载中..' : null,
          this.error ? '加载失败..' : null,
          h(wrapper, {
            props: {
              ...this.$attrs,
              result: this.result
            },
            on: this.$listeners,
            ref: 'test'
          })
        ])
      }
    }
  }
}

export default wrapper
