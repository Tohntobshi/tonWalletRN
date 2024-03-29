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
  disabled?: boolean,
}

function Checkbox({ value, style, onPress, disabled }: PropsWithChildren<Props>): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, value && styles.checked, disabled && styles.disabled, style]}
      disabled={disabled}>
      {value && <Image
        source={require('../../assets/checkmark.png')} 
        style={styles.checkImg}/>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:  {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#53657B',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: '#0088CC',
    borderColor: '#0088CC',
  },
  disabled: {
    opacity: 0.4,
  },
  checkImg: {
    width: 10,
    height: 10,
    marginBottom: 1,
  },
})

export default Checkbox
