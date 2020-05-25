<template>
  <div>
    <button @click="btn">点击</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    btn() {
      console.log('点击');
      this.$http({
        url: '/api/user',
        type: 'get',
        data: {
          params: {
            token: '123123123'
          }
        }
      }).then(res => {
        console.log('res成功', res);
      })
    }
  }
}
</script>

<style scoped>
</style>