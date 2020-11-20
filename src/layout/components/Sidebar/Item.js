import { Icon } from 'ant-design-vue'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('ant-icon')) {
        const type = icon.replace(/ant-icon-/, '')
        const attr = {
          attrs: {
            ...context.props,
            type
          }
        }
        vnodes.push((<Icon {...attr} />))
      }
    }
    if (title) {
      vnodes.push(<span>{(title)}</span>)
    }
    return vnodes
  }
}
