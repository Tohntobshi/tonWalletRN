import React from 'react'
import {
  Image,
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'


interface Props {
  style?: StyleProp<ViewStyle>,
  address: string,
  frame?: boolean
}

function AddressOutput({ style, address, frame }: Props): JSX.Element {
  const onCopyPress = () => {
    Clipboard.setString(address)
  }
  const onTonScanPress = async () => {
    const url = 'https://tonscan.org/address/' + address
    const supported = await Linking.canOpenURL(url)
    if (!supported) return
    Linking.openURL(url)
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {address}
        <TouchableOpacity style={styles.pasteBtn} onPress={onCopyPress}>
          <Image source={require('../../assets/copy.png')} style={styles.pasteImg}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pasteBtn} onPress={onTonScanPress}>
          <Image source={require('../../assets/tonScan.png')} style={styles.pasteImg}/>
        </TouchableOpacity>
      </Text>
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
    minHeight: 48,
    paddingVertical: 16
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#313D4F',
    flexShrink: 1,
    textAlignVertical: 'bottom'
  },
  pasteBtn: {
    width: 16,
    height: 16,
  },
  pasteImg: {
    width: 16,
    height: 16,
  },
})

export default AddressOutput
