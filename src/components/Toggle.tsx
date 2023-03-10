import React from 'react'
import type { PropsWithChildren } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'


interface Props {
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
  value: boolean,
}

function Toggle({ value, style, onPress }: PropsWithChildren<Props>): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}>
      <Image
        source={value ? require('../../assets/toggleOn.png') : require('../../assets/toggleOff.png') } 
        style={styles.toggleImg}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:  {
    width: 32,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleImg: {
    width: 32,
    height: 18,
  },
})

export default Toggle
