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
import { shortenString } from '../utils'


interface Props {
  style?: StyleProp<ViewStyle>,
  text: string,
  frame?: boolean,
  copy?: boolean,
  tonScan?: boolean,
  trim?: boolean,
}

function OutputWithActions({ style, text, frame, copy, tonScan, trim }: Props): JSX.Element {
  const onCopyPress = () => {
    Clipboard.setString(text)
  }
  const onTonScanPress = async () => {
    const url = 'https://tonscan.org/address/' + text
    const supported = await Linking.canOpenURL(url)
    if (!supported) return
    Linking.openURL(url)
  }
  const textToShow = trim ? shortenString(text) : text
  return (
    <View style={[styles.container, frame && styles.frame, style]}>
      <Text style={[styles.text, frame && styles.framedText ]} textBreakStrategy='simple'>
        {textToShow}
        {copy && <TouchableOpacity style={styles.btn} onPress={onCopyPress}>
            <Image source={require('../../assets/copy.png')} style={[styles.img, !frame && styles.noFrameImg]}/>
          </TouchableOpacity>}
        {tonScan && <TouchableOpacity style={styles.btn} onPress={onTonScanPress}>
            <Image source={require('../../assets/tonScan.png')} style={[styles.img, !frame && styles.noFrameImg]}/>
          </TouchableOpacity>}
      </Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    minHeight: 48,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flexShrink: 1,
    textAlignVertical: 'bottom',
    opacity: 0.6,
  },
  framedText: {
    fontSize: 16,
    color: '#313D4F',
    opacity: 1,
  },
  btn: {
    width: 16,
    height: 16,
  },
  img: {
    width: 16,
    height: 16,
  },
  noFrameImg: {
    tintColor: '#FFFFFF',
  },
})

export default OutputWithActions
