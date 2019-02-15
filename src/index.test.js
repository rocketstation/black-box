const renderer = require('react-test-renderer')

const $ = require('./index.js')

test('adds null instead of props if they are omitted', () => {
  const e = renderer.create($('div', 'Hello World!')).toJSON()
  expect(e.type).toEqual('div')
  expect(e.props).toEqual({})
  expect(e.children).toEqual(['Hello World!'])
})

test('merges props.skin with props.className', () => {
  const e = renderer
    .create($('div', { className: 'tst', skin: 'a b c' }, 'Hello World!'))
    .toJSON()
  expect(e.type).toEqual('div')
  expect(e.props).toEqual({ className: 'a b c tst' })
  expect(e.children).toEqual(['Hello World!'])
})

test('pass through args to React.createElement', () => {
  const e = renderer.create($('div', { foo: 'bar' }, 'Hello World!')).toJSON()
  expect(e.type).toEqual('div')
  expect(e.props).toEqual({ foo: 'bar' })
  expect(e.children).toEqual(['Hello World!'])
})
