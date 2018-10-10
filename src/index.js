import { createRenderer } from 'fela'
import { createElement } from 'react'

export default class {
  constructor (renderer = createRenderer()) {
    this.renderer = renderer
  }

  render = (...args) => {
    let type
    let config

    switch (args.length) {
      case 1:
        typeof args[0] === 'object' ? config = args[0] : type = args[0]
        break
      case 2:
        [type, config] = args
        break
    }

    if (type == null) type = 'div'

    const {
      b: {
        children,
        className,
        internal = {},
        ...b
      } = {},
      p,
      s = children,
    } = config || {}

    const styles = []

    if (className) styles.push(className)

    if (typeof p === 'function' || typeof p === 'object') styles.push(this.renderer.renderRule(typeof p === 'function' ? p : () => p, { ...internal, ...b }))

    if (styles.length > 0) b.className = styles.join(' ')

    return Array.isArray(s) ? createElement(type, b, ...s) : createElement(type, b, s)
  }
}
