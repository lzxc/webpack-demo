import { Menu } from 'ant-design-vue'
const { Item: AMenuItem, SubMenu: ASubMenu } = Menu
import Link from './Link.vue'
import Item from './Item'

import path from 'path'
import { isExternal } from '@/common/utils'

export default {
  name: 'SidebarItem',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    item: {
      type: Object,
      default: () => ({})
    },
    isNest: {
      type: Boolean,
      default: false
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
  },
  render() {
    if (this.item.hidden) return
    if (
      this.hasOneShowingChild(this.item.children, this.item) && (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) && !this.item.alwaysShow
    ) {
      return this.onlyOneChild.meta && (
        <Link to={this.resolvePath(this.onlyOneChild.path)}>
          <AMenuItem attrs={{ ...this.$props }} on={{ ...this.$listeners }}>
            <Item icon={this.onlyOneChild.meta.icon || (this.item.meta && this.item.meta.icon)} title={this.onlyOneChild.meta.title}></Item>
          </AMenuItem>
        </Link>
      )
    } else {
      return (
        <ASubMenu attrs={{ ...this.$props }} on={{ ...this.$listeners }}>
          <span slot='title'>
            {this.item.meta && (<span>{this.item.meta.title}</span>)}
          </span>
          {
            this.item.children.map(child => (<SidebarItem item={child} base-path={this.resolvePath(child.path)} in-nest key={child.path}></SidebarItem>)
            )
          }
        </ASubMenu>
      )
    }
  }
}
