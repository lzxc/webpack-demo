<template>
  <div>123</div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
    }
  },
  async  created() {
    const a = await import('assets/js/a.js')
    const b = await import('assets/js/b.js')
    console.log({ a, b })
  },
  methods: {
  }
}
</script>

<style scoped lang=''>
</style>
