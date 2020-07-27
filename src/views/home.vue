<template>
  <div>
    <button @click="btn">点击</button>
    <img :src="src" alt="">
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
        src:require('assets/img/img.jpg')
    }
  },
  created() {
  },
  methods: {
    btn() {
      console.log('点击');
      this.$http({
        url: '/api/user?123123',
        type: 'get',
      }).then(res => {
        console.log('res成功', res);
      })
    }
  }
}
</script>

<style scoped>
</style>