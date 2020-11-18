<template>
  <div>
    <ul>
      <li v-for="(item,index) in result" :key="index">
        {{ item }}---{{ index }}
      </li>
    </ul>
    <slot />
    <slot name="name" />
    <button @click="change">点击重新发起请求</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    result: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      requestParams: {
        subParams: '我是子组件的入参',
        num: 0
      }
    }
  },
  methods: {
    change() {
      this.requestParams.num++
    }
  }
}
</script>

<style scoped lang='less'>
</style>
