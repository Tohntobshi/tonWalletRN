import React, { useEffect, useRef } from 'react'
import {
  Keyboard,
  StyleSheet,
  Animated,
} from 'react-native'


interface Props {
  children?: React.ReactNode,
  shift?: number,
}

function KeyboardAvoidingViewForModal({ children, shift = 0 }: Props): JSX.Element {
  const animState = useRef(new Animated.Value(0)).current
  const animate = (to: number) => {
    Animated.timing(animState, {
      toValue: to,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
    })
  }
  useEffect(() => {
    const listener1 = Keyboard.addListener('keyboardDidShow', () => {
      animate(shift)
    })
    const listener2 = Keyboard.addListener('keyboardDidHide', () => {
      animate(0)
    })
    return () => {
      listener1.remove()
      listener2.remove()
    }
  }, [])
  return (
    <Animated.View style={[styles.container, { translateY: animState }]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default KeyboardAvoidingViewForModal