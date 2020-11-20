/* eslint-disable vue/valid-v-for */
<template>
  <div>
    <a-menu mode="inline">
      <!-- <template v-for="route in permission_routes"> -->
      <!-- <template v-if="!route.hidden">
          <a-menu-item
            v-if="!route.children"
            :key="route.path"
          >
            <item :icon="onlyOneChild.meta.icon || (route.meta && route.meta.icon)" :title="onlyOneChild.meta.title" />
          </a-menu-item>
          <sub-menu
            v-else
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </template> -->
      <!-- </template> -->
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Item from './item.js'
// import SubMenu from './SubMenu.js'
import SidebarItem from './SidebarItem.js'

export default {
  name: 'Sidebar',
  components: {
    // Item,
    // SubMenu,
    SidebarItem
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>
</style>
