const React = require('react')
const ReactFela = require('react-fela')

const Skin = (props) => {
  const renderer = React.useContext(ReactFela.RendererContext)
  const theme = React.useContext(ReactFela.ThemeContext)

  let skin = renderer.renderRule(
    typeof props.skin === 'function'
      ? props.skin
      : () => {
          return props.skin
        },
    { theme },
  )

  if (props.className) skin = props.className + ' ' + skin

  return props.children(skin)
}

module.exports = function () {
  const args = []

  for (let i = 0; i < arguments.length; i++) args.push(arguments[i])

  if (
    Object.prototype.toString.call(args[1]) === '[object Object]' &&
    !Object.prototype.hasOwnProperty.call(args[1], '$$typeof')
  ) {
    if (
      Object.prototype.toString.call(args[1].skin) === '[object Object]' ||
      Object.prototype.toString.call(args[1].skin) === '[object Function]'
    ) {
      const props = Object.assign({}, args[1])

      const skin = props.skin
      delete props.skin

      const className = props.className
      delete props.className

      const key = props.key
      delete props.key

      args.splice(1, 1, props)

      return React.createElement(
        Skin,
        { className, key, skin },
        (className) => {
          props.className = className

          return React.createElement.apply(undefined, args)
        },
      )
    }

    return React.createElement.apply(undefined, args)
  }

  args.splice(1, 0, undefined)

  return React.createElement.apply(undefined, args)
}
