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
  walletNameInput?: boolean,
  onDonePress?: () => void,
}

function Input({ style, error, prefix, suffix, pasteButton,
  onChangeText, amountInput, keyboardType, walletNameInput,
  onDonePress, editable, ...rest }: Props): JSX.Element {
  const onPastePress = async () => {
    const result = await Clipboard.getString()
    onChangeText && onChangeText(result)
  }
  return (
    <View style={[styles.container, walletNameInput && styles.walletNameContainer, error && styles.error, style]}>
      {prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        style={[styles.input, amountInput && styles.amtInput, walletNameInput && styles.walletNameInput]}
        placeholderTextColor={'#91ABB8'}
        onChangeText={onChangeText}
        keyboardType={amountInput ? 'numbers-and-punctuation' : keyboardType}
        editable={editable}
        {...rest}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      {pasteButton && <TouchableOpacity style={styles.pasteBtn}
          onPress={onPastePress} disabled={editable === false}>
          <Image source={require('../../assets/paste.png')} style={styles.pasteImg}/>
        </TouchableOpacity>}
      {onDonePress && <TouchableOpacity style={styles.doneBtn} onPress={onDonePress}>
          <Text style={styles.doneBtnText}>Done</Text>
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
  walletNameContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(0,0,0,0)',
    paddingLeft: 8,
    paddingRight: 6,
    borderRadius: 10,
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
  walletNameInput: {
    color: '#FFFFFF',
    minHeight: 40,
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
  doneBtn: {
    borderRadius: 8,
    height: 28,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  doneBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})

export default Input
