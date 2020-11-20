<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/common/utils'

export default {
  name: 'Link',
  props: {
    to: { type: String, default: '' }
  },
  data() {
    return {
    }
  },
  computed: {
    type() {
      return isExternal(this.to) ? 'a' : 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (isExternal(to)) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
