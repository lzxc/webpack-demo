<template>
  <div id="app">
    <router-link
      v-for="route in permission_routes"
      :key="route.path"
      :to="route.path"
    >{{ route.name }} / </router-link>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['permission_routes'])
  }
}
</script>
<style lang="less">
</style>
