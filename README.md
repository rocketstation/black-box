# Black Box

Black Box is a lightweight & powerful tool based on [React](https://github.com/facebook/react) & [Fela](https://github.com/rofrischmann/fela). It combines behavior, presentation, structure in one place & creates all-in-one components using only JS syntax. It allows you to create custom tags

## Installation

1. Install [React](https://github.com/facebook/react/#installation) & [Fela](https://github.com/rofrischmann/fela/#installation)


2. Install BlackBox
```
npm i --save @rocketstation/black-box
```

## Usage

```javascript
import React from 'react'
import BlackBox from '@rocketstation/black-box'

const bb = new BlackBox()

const $ = bb.element
const $box = (config) => bb.element('div', config)
const $text = (config) => bb.element('span', config)

const MyComponent = ({
  nameFirst,
  nameLast,
}) => $box({
  b: { onClick: () => window.location = 'https://github.com/rocketstation/black-box' },
  p: {
    color: 'blue',
    fontSize: `${24}px`,
    textAlign: 'center',
  },
  s: $text({ s: `Hello ${nameFirst} ${nameLast}!` }),
})

ReactDOM.render(
  $(MyComponent, {
    b: {
      nameFirst: 'John',
      nameLast: 'Doe',
    }
  }),
  document.getElementById('app')
)
```

## Motivation

### Naming Things

>There are only two hard things in Computer Science: cache invalidation and naming things

Phil Karlton

Black Box allows you to create anonymous components without thinking of names

without Black Box
```javascript
const page = () => ({
  display: 'flex',
  flexDirection: 'column',
})

const header = () => ({
  backgroundColor: 'red',
  flexShrink: 0,
  zIndex: 1,
})

const body = () => ({
  backgroundColor: 'green',
  flexGrow: 1,
})

const footer = ({ }) => ({
  backgroundColor: 'blue',
  flexShrink: 0,
})

const Page = createComponent(page)
const Header = createComponent(header)
const Body = createComponent(body)
const Footer = createComponent(footer)

const Component = () => (
  <Page>
    <Header>
      {'Header'}
    </Header>
    <Body>
      {'Body'}
    </Body>
    <Footer>
      {'Footer'}
    </Footer>
  </Page>
)
```

with Black Box
```javascript
const Component = () => $('div', {
  p: {
    display: 'flex',
    flexDirection: 'column',
  },
  s: [
    $('div', {
      p: {
        backgroundColor: 'red',
        flexShrink: 0,
        zIndex: 1,
      },
      s: 'Header'
    }),
    $('div', {
      p: {
        backgroundColor: 'green',
        flexGrow: 1,
      },
      s: 'Body'
    }),
    $('div', {
      p: {
        backgroundColor: 'blue',
        flexShrink: 0,
      },
      s: 'Footer'
    }),
  ]
})
```

### Single Syntax & Single File

Black Box allows you to create components using only JS. It allows you to achieve real modularity by separating code by purpose rather than by syntax

### Less Configs & Less Tools
Black Box allows you to remove all eslint, babel, webpack plugins related to CSS & HTML from your project

### Why not to use JSX
1. JSX tries to combine HTML & JS syntax inside JS. As a result, it limits JS features & adds new language hacks & overheads
2. JSX requires closing tags

JSX
```javascript
const MyComponent = ({
  children,
  sortBy = 'Name',
  order = 'ASC',
  type = 'Table',
  ...props,
}) => {
  const Component = Components[type]

  const propsNext = {
    [sortBy]: order,
    ...props
  }

  return <Component {...propsNext}>{children}</Component>
}
```
Black Box
```javascript
const MyComponent = ({
  children,
  sortBy = 'Name',
  order = 'ASC',
  type = 'Table',
  ...props,
}) => $(Components[type], {
  b: {
    [sortBy]: order,
    ...props
  },
  s: children
})
```
### Fela Diff
Black Box is based on Fela's [`renderRule`](http://fela.js.org/docs/api/fela/Renderer.html) method. However, unlike [`renderRule`](http://fela.js.org/docs/api/fela/Renderer.html) method, Black Box accepts both functions and objects. All objects will be converted into functions automatically. If Array is passed, all elements will be combined with `combineRule`

Unlike Fela's [`createComponent`](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/createComponent.md) method, which requires specifying props to pass them to the underlying DOM element, Black Box passes all props except those which were declared as internal

```javascript
$box({
  b: {
    internal: {
      foo: 'This prop will be passed only to Fela’s `renderRule` method'
    },
    bar: 'This prop will be passed both to Fela’s `renderRule` method & to the underlying DOM element'
  }
})
```

## Advanced Usage
1. Config

service/renderer.js
```javascript
import { createRenderer } from 'fela'

const renderer = createRenderer({/* Custom Fela Config */})

export default renderer
```

service/black-box.js
```javascript

import BlackBox from '@rocketstation/black-box'
import renderer from 'service/renderer'

export default new BlackBox(renderer).element

```
2. Autoimport

webpack.config.js
```javascript
// ...
module.exports = {
  // ...
  plugins: [new webpack.ProvidePlugin({ $: ['service/black-box', 'default'] }) ]
  // ...
}
```

## API
```javascript
new BlackBox([renderer])
```

creates & returns a configured instance of Black Box. If the custom [renderer](http://fela.js.org/docs/api/fela/Renderer.html) is not provided, creates default [renderer](http://fela.js.org/docs/api/fela/createRenderer.html) without config automatically.

```javascript
const $ = new BlackBox().element

$('div', {
  b: {
    internal: propsInternal,
    ...props
  },
  p: [...(rulesFn || rulesObj)],
  s: children,
})
```
creates & returns React elements. All config keys are optional

- **b** - stands for behavior. Accepts any valid React props and passes them to Fela's `renderRule` & React's `createElement` method. Internal props will be only passed to Fela's `renderRule`
- **p** - stands for presentation. Accepts any valid [Fela rule](http://fela.js.org/docs/basics/Rules.html). If object is passed, it will be converted into function automatically. If array is passed, it will combine all elements with `combineRules`
- **s** - stands for structure. Accepts any valid React children and passes them to React's `createElement` method


## License
Black Box is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)
