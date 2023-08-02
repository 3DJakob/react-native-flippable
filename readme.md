### React Native Flippable

A npm react-native package for making any element flippable using gestures.

The flippable content can be any react-native element. The flip can be trigger by velocity, drag or tap.

The size of the flippable content is determined by the size of the first child.

## Installation

```bash
npm install react-native-flippable --save
```

## Usage

```jsx
import Flippable from 'react-native-flippable'

...

<Flippable>
  <View>
    <Text>Front</Text>
  </View>
  <View>
    <Text>Back</Text>
  </View>
</Flippable>
```

## Props

### `children`

- required
- type: `React.ReactNode[]`

The children to be flipped. The first child will be the front, the second child will be the back.

### `flipOnTap`

- optional
- type: `boolean`

If the card should be flipped if the user taps on it.

## API
