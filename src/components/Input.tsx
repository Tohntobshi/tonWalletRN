import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'


type Props = React.ComponentProps<typeof TextInput> & {
  style?: StyleProp<ViewStyle>,
  error?: boolean,
  prefix?: string,
  suffix?: string,
  units?: string,
  placeholder?: string,
  value?: string,
  onChange?: (value: string) => void,
}

function Input({ style, error, prefix, suffix, ...rest }: Props): JSX.Element {
  return (
    <View style={[styles.container, error && styles.error, style]}>
      {prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={'#91ABB8'}
        {...rest}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    alignItems: 'center',
  },
  prefix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91ABB8',
    marginRight: 5,
  },
  suffix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91ABB8',
    marginLeft: 5,
  },
  input: {
    flexGrow: 1,
    minHeight: 48,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    borderColor: '#F35B5B',
  },
})

export default Input
