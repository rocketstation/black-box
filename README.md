# Black Box

adds null instead of props if they are omitted & merges props.skin with props.className

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

BlackBox adds extra configuration to `React.createElement`

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
    'Hello World!'
  )
```

## License

Black Box is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)
