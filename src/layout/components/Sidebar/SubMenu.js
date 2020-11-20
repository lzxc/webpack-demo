import { Menu } from 'ant-design-vue'
import Item from './Item.js'
import path from 'path'
import { isExternal } from '@/common/utils'

const SubMenu = {
  template: `
    <a-menu-item
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && 
    !item.alwaysShow" v-bind="$props" v-on="$listeners">
      <item :icon="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
    </a-menu-item>
   
    <a-sub-menu v-else :key="resolvePath(item.path)"
    v-bind="$props"
    v-on="$listeners">
      <span slot="title">
        <span v-if="item.meta">{{item.meta.title}}</span>
      </span>
      <template v-for="child in item.children">
        <a-menu-item v-if="!child.children" :key="child.id">
          <span>{{ child.name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="child.path" :item="child" :basePath="resolvePath(child.path)"/>
      </template>
    </a-sub-menu>
  `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  components: { Item },
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    item: {
      type: Object,
      default: () => ({})
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}

export default SubMenu
