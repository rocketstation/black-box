# Black Box

Black Box is a lightweight & powerful tool based on [React](https://github.com/facebook/react) & [Fela](https://github.com/rofrischmann/fela). It combines behavior, presentation, structure in one place

## Installation

```
npm i --save @rocketstation/black-box
```

## Usage

```javascript
import $ from '@rocketstation/black-box'

const MyComponent = ({ name }) =>
  $(
    'div',
    { onClick: () => { console.log('test') } },
    { textAlign: 'center' },
    'Hello'
    $('span', null, { fontWeight: 600 }, name }),
    '!'
  )

ReactDOM.render(
  $(MyComponent, { name: 'John Doe' }),
  document.getElementById('app')
)
```

## Motivation

BlackBox adds extra configuration to `React.createElement`. It is the missing piece of all-in-one components

### Single Syntax & Single File

Black Box allows you to create components using only JS. It allows you to achieve real modularity by separating code by purpose rather than by syntax

### Less Configs & Less Tools

Black Box allows you to remove all eslint, babel, webpack plugins related to CSS & HTML from your project

### Why not to use JSX

JSX is not JS. It tries to combine HTML & JS syntax inside JS. It limits JS features & adds new language hacks & overheads. Moreover, JSX requires closing tags

JSX

```javascript
const MyComponent = ({
  children,
  sortBy = 'Name',
  order = 'ASC',
  type = 'Table',
  ...props
}) => {
  const Component = Components[type]

  const propsNext = {
    [sortBy]: order,
    ...props,
  }

  return <Component {...props}>Hello World!</Component>
}
```

BlackBox

```javascript
const MyComponent = ({
  children,
  sortBy = 'Name',
  order = 'ASC',
  type = 'Table',
}) =>
  $(
    Components[type],
    {
      [sortBy]: order,
      ...props,
    },
    null,
    'Hello World!'
  )
```

## API

```javascript
$(type, b, p, [...children])
```

creates React element

- **type** - React component
- **b** - component props
- **p** - Fela rules
- **children** - React children

## License

Black Box is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)
