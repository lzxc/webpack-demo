<template>
  <div>{{ result }}</div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    result: { type: Object, default: () => ({}) }
  }
}
</script>

<style scoped lang='less'>
</style>
