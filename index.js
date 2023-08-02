const React = require('react')
const { View, Dimensions } = require('react-native')
const { useSpring, animated } = require('@react-spring/native')

const { width } = Dimensions.get('window')

const AnimatedFlipp = animated(View)

const Flippable = React.forwardRef(
  (
    { children, flipOnTap = true },
    ref
  ) => {
    const [pos, setPos] = React.useState({ x: 0, time: 0, velocity: 0 })
    const [start, setStart] = React.useState()

    const animatedStyle = useSpring({
      x: pos.x,
      config: {
        tension: start == null ? 100 : 0,
        friction: 10,
        mass: 1
      }
    })

    const handleTouchStart = (e) => {
      setStart({
        touchX: e.nativeEvent.touches[0].pageX,
        cardPos: pos.x
      })
    }

    const handleTouchMove = (e) => {
      if (start == null) return
      const newX = (e.nativeEvent.touches[0].pageX - start.touchX) / width + start.cardPos
      setPos({
        x: newX,
        time: Date.now(),
        velocity: (newX - pos.x) * width / (Date.now() - pos.time)
      })
    }

    const handleTouchEnd = (e) => {
      if (start == null) return
      const swipeDirection = e.nativeEvent.changedTouches[0].pageX - start.touchX // negative is right, positive is left

      const nearest = Math.round(pos.x)
      const snappingDirection = nearest - pos.x

      // it was a successful swipe if the snapping direction and the swipe direction are the same
      const wasSuccessful = (snappingDirection > 0 && swipeDirection > 0) || (snappingDirection < 0 && swipeDirection < 0)

      let targetX = nearest

      if (start.touchX === e.nativeEvent.changedTouches[0].pageX && flipOnTap) {
      // it was a tap, flip the card
        targetX--
      }

      if (!wasSuccessful) {
      // check if the velocity is enough to go to the next card
        if (Math.abs(pos.velocity) > 0.5) {
          targetX = Math.round(pos.x + Math.sign(pos.velocity))
        }
      }

      setStart(null)
      setPos({
        x: targetX,
        time: Date.now(),
        velocity: 0
      })
    }

    React.useImperativeHandle(ref, () => ({
      flipLeft: () => setPos({
        x: pos.x + 1,
        time: Date.now(),
        velocity: 0
      }),
      flipRight: () => setPos({
        x: pos.x - 1,
        time: Date.now(),
        velocity: 0
      })
    }))

    return (
      <View onTouchStart={e => handleTouchStart(e)} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {/* Front */}
        <AnimatedFlipp style={
        {
          backfaceVisibility: children.length === 1 ? 'visible' : 'hidden',
          transform: [
            {
              perspective: 2000
            },
            {
              rotateY: animatedStyle.x.to({
                range: [0, -0.5],
                output: ['0deg', '90deg']
              })
            }
          ]
        }
      }
        >
          {children[0]}
        </AnimatedFlipp>

        {/* Back */}
        <AnimatedFlipp style={
        {
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [
            {
              perspective: 2000
            },
            {
              rotateY: animatedStyle.x.to({
                range: [0, -0.5],
                output: ['180deg', '270deg']
              })
            }
          ]
        }
      }
        >
          {children[1]}
        </AnimatedFlipp>
      </View>
    )
  })

module.exports = Flippable
