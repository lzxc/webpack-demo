<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang='less'>
.app-main{
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
