# Black Box

adds null instead of props if they are omitted & merges props.skin with props.className

## Installation

```
npm i --save @rocketstation/black-box
```

## Usage

```javascript
import $ from '@rocketstation/black-box'

const MyComponent = ({ name, ...props }) =>
  $(
    'div',
    {
      onClick: () => { console.log('test') },
      skin: 'a b c',
      ...props
    },
    'Hello',
    $('span', name),
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

## License

Black Box is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)
