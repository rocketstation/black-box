var React = require('react')
var ReactFela = require('react-fela')

module.exports = function() {
  var args = []

  for (var i = 0; i < arguments.length; i++) args.push(arguments[i])

  if (
    Object.prototype.toString.call(arguments[1]) !== '[object Object]' ||
    React.isValidElement(arguments[1])
  ) {
    args.splice(1, 0, undefined)

    return React.createElement.apply(void 0, args)
  }

  if (arguments[1].hasOwnProperty('skin')) {
    var props = Object.assign({}, arguments[1])
    args.splice(1, 1, props)

    var key
    if (props.hasOwnProperty('key')) {
      key = { key: props.key }
      delete props.key
    }

    var className = ''
    if (props.hasOwnProperty('className')) {
      className = props.className + ' '
      delete props.className
    }

    var skin

    if (typeof props.skin === 'function') skin = props.skin
    else {
      var rules = Object.assign({}, props.skin)

      skin = function() {
        return rules
      }
    }

    delete props.skin

    return React.createElement(
      ReactFela.RendererContext.Consumer,
      key,
      function(renderer) {
        return React.createElement(
          ReactFela.ThemeContext.Consumer,
          undefined,
          function(theme) {
            var config = Object.assign({ theme }, props)
            delete config.children

            props.className = className + renderer.renderRule(skin, config)

            return React.createElement.apply(void 0, args)
          }
        )
      }
    )
  }

  return React.createElement.apply(void 0, args)
}
