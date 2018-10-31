import { isFn, isObj } from '@rocketstation/check-if-type'

import {
  combineRules,
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

    if (p) {
      const rules = combineRules([].concat(p).reduce((r, v) => {
        switch (true) {
          case isFn(v):
            r.push(v)
            break
          case isObj(v):
            r.push(() => v)
            break
        }

        return r
      }, []))

      styles.push(this.renderer.renderRule(rules, {
        ...internal,
        ...b,
      }))
    }

    if (styles.length > 0) b.className = styles.join(' ')

    return Array.isArray(s) ? createElement(type, b, ...s) : createElement(type, b, s)
  }
}
