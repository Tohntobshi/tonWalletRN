import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'


interface Props {
  source: ImageSourcePropType,
  label: string,
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
}

function ActionButton({ style, source, label, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}>
      <Image source={source} style={styles.image}/>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    marginTop: 5,
    color: '#313D4F',
    fontSize: 13,
    fontWeight: '600',
  },
})

export default ActionButton
