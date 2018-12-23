var Fela = require('fela')
var React = require('react')
var ReactFela = require('react-fela')

const renderer = require('react-test-renderer')

const $ = require('./index.js')

test('', () => {
  expect(
    renderer
      .create(
        React.createElement(
          ReactFela.RendererProvider,
          { renderer: Fela.createRenderer() },
          $(
            'div',
            {
              className: 'test',
              onClick: () => {
                console.log('test')
              },
            },
            {
              backgroundColor: 'white',
              color: 'black',
            },
            $('div', null, { height: '10px' }),
            $('div', null, null, 'Hello'),
            $('div', null, null, 'World'),
            $('div', null, { height: '10px' })
          )
        )
      )
      .toJSON()
  ).toMatchSnapshot()
})
