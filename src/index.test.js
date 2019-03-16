const Fela = require('fela')
const React = require('react')
const ReactFela = require('react-fela')

const renderer = require('react-test-renderer')

const $ = require('./index.js')

test('adds null instead of props if they are omitted', () => {
  const e = renderer.create($('div', 'Hello World!')).toJSON()
  expect(e.type).toEqual('div')
  expect(e.props).toEqual({})
  expect(e.children).toEqual(['Hello World!'])
})

test('passes through args to React.createElement', () => {
  const e = renderer.create($('div', { foo: 'bar' }, 'Hello World!')).toJSON()
  expect(e.type).toEqual('div')
  expect(e.props).toEqual({ foo: 'bar' })
  expect(e.children).toEqual(['Hello World!'])
})

test('parses skin', () => {
  const e = renderer
    .create(
      React.createElement(
        ReactFela.RendererProvider,
        { renderer: Fela.createRenderer() },
        $(
          'div',
          {
            key: 'tst',
            skin: [
              ({ isActive }) => ({
                backgroundColor: isActive ? 'black' : 'white',
              }),
              { color: 'white' },
            ],
            skinConfigs: { isActive: true },
          },
          'Hello World!'
        )
      )
    )
    .toJSON()

  expect(e.type).toEqual('div')
  expect(e.props).toEqual({ className: 'a b' })
  expect(e.children).toEqual(['Hello World!'])
})
