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
  text: string,
  frame?: boolean,
  copy?: boolean,
  tonScan?: boolean,
  limit?: number,
}

function OutputWithActions({ style, text, frame, copy, tonScan, limit }: Props): JSX.Element {
  const onCopyPress = () => {
    Clipboard.setString(text)
  }
  const onTonScanPress = async () => {
    const url = 'https://tonscan.org/address/' + text
    const supported = await Linking.canOpenURL(url)
    if (!supported) return
    Linking.openURL(url)
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text} textBreakStrategy='simple'>
        {text}
        {copy && <TouchableOpacity style={styles.btn} onPress={onCopyPress}>
            <Image source={require('../../assets/copy.png')} style={styles.img}/>
          </TouchableOpacity>}
        {tonScan && <TouchableOpacity style={styles.btn} onPress={onTonScanPress}>
            <Image source={require('../../assets/tonScan.png')} style={styles.img}/>
          </TouchableOpacity>}
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
  btn: {
    width: 16,
    height: 16,
  },
  img: {
    width: 16,
    height: 16,
  },
})

export default OutputWithActions
