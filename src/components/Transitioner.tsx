import React, { useEffect, useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  LayoutChangeEvent,
} from 'react-native'

const scaleInterpolationRange = {
  inputRange: [-1, 0, 1],
  outputRange: [0.2, 1, 1]
}

interface Props {
  style?: StyleProp<ViewStyle>,
  elements: JSX.Element[],
  active: number,
}

interface State {
  currentElement: JSX.Element | undefined,
  nextElement: JSX.Element | undefined,
  prevActiveElement: number,
  activeScreen: number,
  nextScreen: number,

}

function Transitioner({ style, elements, active: activeElement }: Props): JSX.Element {
  const [state, setState] = useState<State>({
    currentElement: undefined,
    nextElement: undefined,
    prevActiveElement: 0,
    activeScreen: 0,
    nextScreen: 0
  })
  const [width, setWidth] = useState(0)

  const position = useRef(new Animated.Value(0)).current
  const position1 = useRef(Animated.add(Animated.modulo(position, 3), -1)).current
  const position2 = useRef(Animated.add(Animated.modulo(Animated.add(position, 1), 3), -1)).current
  const position3 = useRef(Animated.add(Animated.modulo(Animated.add(position, 2), 3), -1)).current
  const positions = [position1, position2, position3]

  const activateScreen = (index: number) => {
    Animated.timing(position, {
      toValue: (1 - index),
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setState((st) => ({
        activeScreen: index,
        currentElement: elements[activeElement],
        nextElement: undefined,
        nextScreen: st.nextScreen,
        prevActiveElement: st.prevActiveElement
      }))
    })
  }
  let realActiveScreen = state.activeScreen % 3
  realActiveScreen = realActiveScreen < 0 ? 3 + realActiveScreen : realActiveScreen

  let realNextScreen = state.nextScreen % 3
  realNextScreen = realNextScreen < 0 ? 3 + realNextScreen : realNextScreen
  
  useEffect(() => {
    const nextScreen = state.prevActiveElement > activeElement ? state.activeScreen - 1 : state.activeScreen + 1
    setState({
      nextScreen,
      nextElement: elements[activeElement],
      prevActiveElement: activeElement,
      currentElement: elements[state.prevActiveElement],
      activeScreen: state.activeScreen
    })
    activateScreen(nextScreen)
  }, [activeElement])

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }
  return (
    <View style={style} onLayout={onLayout}>
      {positions.map((el, index) => {
        return <Animated.View key={index} style={[styles.common, { 
            translateX: Animated.multiply(el, width),
            scaleX: el.interpolate(scaleInterpolationRange),
            scaleY: el.interpolate(scaleInterpolationRange),
            opacity: el.interpolate(scaleInterpolationRange),
          }]}>
          {realActiveScreen === index ? state.currentElement : (realNextScreen === index ? state.nextElement : undefined)}
        </Animated.View>
      })}
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
