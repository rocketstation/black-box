import { isFn, isObj } from '@rocketstation/check-if-type'

import {
  createRenderer,
} from 'fela'
import {
  createElement,
} from 'react'

export default class {
  constructor (renderer = createRenderer()) {
    this.renderer = renderer
  }

  element = (type, {
    b: {
      children,
      className,
      internal = {},
      ...b
    } = {},
    p,
    s = children,
  } = {}) => {
    const styles = []

    if (className) styles.push(className)

    if (isObj(p) || isFn(p)) {
      styles.push(this.renderer.renderRule(isFn(p) ? p : () => p, {
        ...internal,
        ...b,
      }))
    }

    if (styles.length > 0) b.className = styles.join(' ')

    return Array.isArray(s) ? createElement(type, b, ...s) : createElement(type, b, s)
  }
}
