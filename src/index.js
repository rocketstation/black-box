var React = require('react')
var ReactFela = require('react-fela')

function create(type, props, children) {
  return React.createElement.apply(void 0, [type, props].concat(children))
}

module.exports = function(type, b, p) {
  var childrenAmount = arguments.length - 3
  var children = new Array(childrenAmount > 0 ? childrenAmount : 0)

  for (var i = 0; i < childrenAmount; i++) children[i] = arguments[i + 3]

  if (p != null) {
    var bNext = Object.assign({}, b)
    var pNext = { style: p }

    if (bNext.hasOwnProperty('key')) {
      pNext.key = bNext.key
      delete bNext.key
    }

    return React.createElement(ReactFela.FelaComponent, pNext, function(p) {
      bNext.className = [p.className, bNext.className].filter(Boolean).join(' ')

      return create(type, bNext, children)
    })
  }

  return create(type, b, children)
}
