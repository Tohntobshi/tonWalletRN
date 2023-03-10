import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'


interface Props {
  labels: string[],
  value: number,
  style?: StyleProp<ViewStyle>,
  onChange?: (index: number) => void,
}

function MainTabs({ style, labels, onChange, value }: Props): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      {labels.map((label, index) => <TouchableOpacity
        style={[styles.btn, value === index && styles.active]}
        onPress={() => onChange && onChange(index)}>
        <Text style={[styles.text, value === index && styles.textActive]}>{label}</Text>
      </TouchableOpacity>)}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: 'rgba(132,146,171,0.3)',
  },
  btn: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
  },
  active: {
    borderColor: '#0088CC',
  },
  text: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '500',
  },
  textActive: {
    color: '#0088CC',
  },
})

export default MainTabs
