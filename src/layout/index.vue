<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar/index'
import AppMain from './components/AppMain'

export default {
  name: 'Layout',
  components: { Sidebar, AppMain },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang='less'>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
  }
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    position: relative;
  }
}
</style>
