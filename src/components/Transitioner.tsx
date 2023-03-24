import React, { useEffect, useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  Dimensions,
} from 'react-native'

const width = Dimensions.get('window').width

const scaleInterpolationRange = {
  inputRange: [-width, 0, width],
  outputRange: [0.2, 1, 1]
}

interface Props {
  style?: StyleProp<ViewStyle>,
  elements: JSX.Element[],
  active: number,
}

function Transitioner({ style, elements, active: activeElement }: Props): JSX.Element {
  const [elementToRender1, setElementToRender1] = useState<JSX.Element | undefined>()
  const [elementToRender2, setElementToRender2] = useState<JSX.Element | undefined>()
  const [prevActiveElement, setPrevActiveElement] = useState(0)

  const [activeScreen, setActiveScreen] = useState(0)
  const [nextScreen, setNextScreen] = useState(0)
  const position = useRef(new Animated.Value(0)).current
  const position1 = useRef(Animated.add(Animated.modulo(position, width * 3), -width)).current
  const position2 = useRef(Animated.add(Animated.modulo(Animated.add(position, width), width * 3), -width)).current
  const position3 = useRef(Animated.add(Animated.modulo(Animated.add(position, 2 * width), width * 3), -width)).current

  const activateScreen = (index: number) => {
    setNextScreen(index)
    Animated.timing(position, {
      toValue: (1 - index) * width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveScreen(index)
      setElementToRender1(elements[activeElement])
      setElementToRender2(undefined)
    })
  }
  let realActiveScreen = activeScreen % 3
  realActiveScreen = realActiveScreen < 0 ? 3 + realActiveScreen : realActiveScreen

  let realNextScreen = nextScreen % 3
  realNextScreen = realNextScreen < 0 ? 3 + realNextScreen : realNextScreen
  
  useEffect(() => {
    setElementToRender2(elements[activeElement])
    activateScreen(prevActiveElement > activeElement ? activeScreen - 1 : activeScreen + 1)
    setPrevActiveElement(activeElement)
  }, [activeElement])
  return (
    <View style={style}>
      <Animated.View style={[styles.common, { 
          translateX: position1,
          scaleX: position1.interpolate(scaleInterpolationRange),
          scaleY: position1.interpolate(scaleInterpolationRange),
          opacity: position1.interpolate(scaleInterpolationRange),
        }]}>
        {realActiveScreen === 0 && elementToRender1}
        {realNextScreen === 0 && elementToRender2}
      </Animated.View>
      <Animated.View style={[styles.common, { 
          translateX: position2,
          scaleX: position2.interpolate(scaleInterpolationRange),
          scaleY: position2.interpolate(scaleInterpolationRange),
          opacity: position2.interpolate(scaleInterpolationRange),
        }]}>
        {realActiveScreen === 1 && elementToRender1}
        {realNextScreen === 1 && elementToRender2}
      </Animated.View>
      <Animated.View style={[styles.common, { 
          translateX: position3,
          scaleX: position3.interpolate(scaleInterpolationRange),
          scaleY: position3.interpolate(scaleInterpolationRange),
          opacity: position3.interpolate(scaleInterpolationRange),
        }]}>
        {realActiveScreen === 2 && elementToRender1}
        {realNextScreen === 2 && elementToRender2}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  common: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
})

export default Transitioner
