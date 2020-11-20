<template>
  <div class="app-main">
    <transition name="fate-transform" mode="out-in">
      <keep-alive>
        <router-view />
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
.app-main{}
</style>
