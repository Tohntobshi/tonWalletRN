import React from 'react'
import type { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'


interface Props {
  type: 'primary' | 'secondary' | 'danger' | 'link' | 'linkSecondary' | 'linkDanger',
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
}

function Button({ type, children, style, onPress }: PropsWithChildren<Props>): JSX.Element {
  const containerStyle = ['primary', 'secondary', 'danger'].includes(type) ? [(styles as any)[type], styles.container, style] : style
  const textStyle = ['primary',  'danger'].includes(type) ? styles.textButton : (
    type === 'secondary' ? styles.textButtonSec : (
      type === 'link' ? styles.textLink : (
        type === 'linkDanger' ? styles.textLinkDanger : styles.textLinkSec
      )))

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}>
        <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#0088CC',
  },
  secondary: {
    backgroundColor: '#DCE5EB',
  },
  danger: {
    backgroundColor: '#F35B5B',
  },
  container: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textButtonSec: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2D4C5C',
  },
  textLink: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0088CC',
  },
  textLinkDanger: {
    fontSize: 17,
    fontWeight: '600',
    color: '#F35B5B',
  },
  textLinkSec: {
    fontSize: 15,
    fontWeight: '400',
    color: '#798795'
  }
})

export default Button
