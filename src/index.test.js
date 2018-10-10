import {
  createRenderer
} from 'fela'
import {
  createElement
} from 'react'

import BlackBox from './index'

jest.mock('fela')
jest.mock('react')

const renderer = createRenderer()
const $ = new BlackBox(renderer).element

it('uses default renderer if custom renderer is not provided', () => {
  new BlackBox()

  expect(createRenderer).toBeCalled()
})

it('creates custom element without config if called with 1 arg`', () => {
  expect($('custom')).toEqual({
    children: [undefined],
    props: {},
    type: 'custom'
  })
})

it('creates custom element with config if called with 2 args', () => {
  const b = {
    foo: 'bar'
  }

  expect($('custom', {
    b
  })).toEqual({
    children: [undefined],
    props: b,
    type: 'custom'
  })
})

it('parses `s` key from config to element’s children', () => {
  const s = 'Valid React Element'

  expect($('custom', {
    s
  })).toMatchObject({
    children: [s]
  })
})

it('spreads `s` key from config to element’s children if `s` is array', () => {
  expect($('custom', {
    s: ['foo', 'bar']
  })).toMatchObject({
    children: ['foo', 'bar']
  })
})

it('parses `b` key from config to element’s props', () => {
  const b = {
    foo: 'bar'
  }

  expect($('custom', {
    b
  })).toMatchObject({
    props: b
  })
})

it('excludes `internal` key from `b` key from config', () => {
  expect($('custom', {
    b: {
      internal: {}
    }
  })).toMatchObject({
    props: {}
  })
})

it('parses `p` key from config to element’s className', () => {
  expect($('custom', {
    p: {
      foo: 'bar'
    }
  })).toMatchObject({
    props: {
      className: 'className'
    }
  })
})

it('merges className from `b` key from config && className parsed from `p` key from config', () => {
  expect($('custom', {
    b: {
      className: 'myClassName'
    },
    p: {
      foo: 'bar'
    }
  })).toMatchObject({
    props: {
      className: 'myClassName className'
    }
  })
})

it('passes Valid Fela Rule && merged config to `renderer.renderRule` if `p` key from config is Valid Fela Rule || object', () => {
  const b = {
    internal: {
      bar: 'foo'
    },
    foo: 'bar'
  }

  const bNext = {
    bar: 'foo',
    foo: 'bar',
  }

  const p = {
    foo: 'bar'
  }

  $('custom', {
    b,
    p
  })

  expect(renderer.renderRule).toBeCalledWith(expect.any(Function), bNext)

  $('custom', {
    b,
    p: () => p
  })

  expect(renderer.renderRule).toBeCalledWith(expect.any(Function), bNext)
})
