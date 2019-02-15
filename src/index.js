const React = require('react')

module.exports = function() {
  var args = []

  for (var i = 0; i < arguments.length; i++) args.push(arguments[i])

  switch (true) {
    case Object.prototype.toString.call(arguments[1]) !== '[object Object]':
      args.splice(1, 0, null)
      break
    case arguments[1].hasOwnProperty('skin'): {
      var props = Object.assign({}, arguments[1])

      props.className = [props.skin, props.className].filter(Boolean).join(' ')

      delete props.skin

      args.splice(1, 1, props)
      break
    }
  }

  return React.createElement.apply(void 0, args)
}
