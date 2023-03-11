import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'


type Props = React.ComponentProps<typeof TextInput> & {
  style?: StyleProp<ViewStyle>,
  error?: boolean,
  prefix?: string,
  suffix?: string,
  onChangeText?: (value: string) => void,
  pasteButton?: boolean,
  amountInput?: boolean,
}

function Input({ style, error, prefix, suffix, pasteButton, onChangeText, amountInput, keyboardType, ...rest }: Props): JSX.Element {
  const onPastePress = async () => {
    const result = await Clipboard.getString()
    onChangeText && onChangeText(result)
  }
  return (
    <View style={[styles.container, error && styles.error, style]}>
      {prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        style={[styles.input, amountInput && styles.amtInput]}
        placeholderTextColor={'#91ABB8'}
        onChangeText={onChangeText}
        keyboardType={amountInput ? 'numbers-and-punctuation' : keyboardType}
        {...rest}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      {pasteButton && <TouchableOpacity style={styles.pasteBtn} onPress={onPastePress}>
          <Image source={require('../../assets/paste.png')} style={styles.pasteImg}/>
        </TouchableOpacity>}
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
    flexShrink: 0,
  },
  suffix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91ABB8',
    marginLeft: 5,
    flexShrink: 0,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 48,
    fontSize: 16,
    fontWeight: '600',
    color: '#313D4F',
  },
  amtInput: {
    minHeight: 64,
    fontSize: 48,
  },
  error: {
    borderColor: '#F35B5B',
  },
  pasteBtn: {
    width: 20,
    height: 20,
    flexShrink: 0,
    marginLeft: 5,
  },
  pasteImg: {
    width: 20,
    height: 20,
  },
})

export default Input
