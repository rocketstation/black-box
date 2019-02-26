# Black Box

Black Box is a lightweight & powerful tool based on [React](https://github.com/facebook/react) & [Fela](https://github.com/rofrischmann/fela). It combines behavior, presentation, structure in one place

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
      skin: {
        backgroundColor: 'black',
        color: 'white',
      },
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
