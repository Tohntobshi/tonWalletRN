import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface Props {
  onRequestClose?: () => void,
  title: string,
  style?: StyleProp<ViewStyle>,
  disabledClose?: boolean,
}

function ModalBottomHeader({ onRequestClose, title, style, disabledClose }: Props): JSX.Element {
  const _onRequestClose = () => {
    if (disabledClose) return
    onRequestClose && onRequestClose()
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={[styles.closeBtn, disabledClose && styles.disabled]}
        onPress={_onRequestClose} disabled={disabledClose}>
        <Image
          source={require('../../assets/cross.png')} 
          style={styles.closeBtnImg}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  title: {
    textAlign: 'center',
    marginLeft: 30,
    flex: 1,
    color: '#313D4F',
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    backgroundColor: '#E3E7EC',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  closeBtnImg: {
    width: 12,
    height: 12,
  },
})

export default ModalBottomHeader
