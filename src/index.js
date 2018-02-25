import { createRenderer } from 'fela'
import { createElement } from 'react'

export default (renderer = createRenderer()) => (...args) => {
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

  const {
    b: {
      className,
      internal = {},
      ...b
    } = {},
    p,
    s,
  } = config || {}

  const styles = []

  if (className) styles.push(className)

  if (typeof p === 'function' || typeof p === 'object') styles.push(renderer.renderRule(typeof p === 'function' ? p : () => p, { ...internal, ...b }))

  if (styles.length > 0) b.className = styles.join(' ')

  return createElement(type || 'div', b, s)
}
