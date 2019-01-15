var React = require('react')
var ReactFela = require('react-fela')

function create(type, props, children) {
  return React.createElement.apply(void 0, [type, props].concat(children))
}

module.exports = function(type, b, p) {
  var childrenAmount = arguments.length - 3
  var children = new Array(childrenAmount > 0 ? childrenAmount : 0)

  for (var i = 0; i < childrenAmount; i++) children[i] = arguments[i + 3]

  return p != null
    ? React.createElement(ReactFela.FelaComponent, { style: p }, function(p) {
        const props = Object.assign({}, b)

        props.className = [p.className, props.className]
          .filter(Boolean)
          .join(' ')

        return create(type, props, children)
      })
    : create(type, b, children)
}
