var Fela = require('fela')
var React = require('react')
var ReactFela = require('react-fela')

module.exports = function() {
  var args = []

  for (var i = 0; i < arguments.length; i++) args.push(arguments[i])

  switch (true) {
    case Object.prototype.toString.call(arguments[1]) !== '[object Object]' ||
      React.isValidElement(arguments[1]):
      args.splice(1, 0, undefined)
      break
    case arguments[1].hasOwnProperty('skin'): {
      var props = Object.assign({}, arguments[1])
      args.splice(1, 1, props)

      var skin = props.skin
      delete props.skin

      var key
      if (props.hasOwnProperty('key')) {
        key = { key: props.key }
        delete props.key
      }

      return React.createElement(
        ReactFela.RendererContext.Consumer,
        key,
        function(renderer) {
          return React.createElement(
            ReactFela.ThemeContext.Consumer,
            undefined,
            function(theme) {
              var className = renderer.renderRule(
                Fela.combineRules.apply(void 0, [].concat(skin)),
                Object.assign({}, props, theme)
              )

              props.className = props.hasOwnProperty('className')
                ? props.className + ' ' + className
                : className

              return React.createElement.apply(void 0, args)
            }
          )
        }
      )
    }
  }

  return React.createElement.apply(void 0, args)
}
