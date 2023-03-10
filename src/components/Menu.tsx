import React, { useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import Toggle from './Toggle'

interface Props {
  style?: StyleProp<ViewStyle>,
  onBackupPress?: () => void,
  onExitPress?: () => void,
}

function Menu({ style, onBackupPress, onExitPress }: Props): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const _onBackupPress = () => {
    setOpen(false)
    onBackupPress && onBackupPress()
  }
  const _onSettingsPress = () => {
    setOpen(false)
  }
  const _onAboutPress = () => {
    setOpen(false)
  }
  const _onExitPress = () => {
    setOpen(false)
    onExitPress && onExitPress()
  }
  return (
    <View style={[styles.container1, style]}>
      <TouchableOpacity style={styles.menuBtn} onPress={() => setOpen(true)}>
        <Image
          source={require('../../assets/menu.png')}
          style={styles.menuBtnImg}/>
      </TouchableOpacity>
      <Modal transparent visible={isOpen}>
        <View style={styles.container2}>
          <Pressable style={styles.touchableBackground} onPress={() => setOpen(false)}/>
          <View style={styles.container3}>
            <TouchableOpacity style={styles.menuItemToggle} onPress={() => setToggle1(!toggle1)}>
              <Text style={styles.text}>TON Proxy</Text>
              <Toggle value={toggle1} onPress={() => setToggle1(!toggle1)}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemToggle} onPress={() => setToggle2(!toggle2)}>
              <Text style={styles.text}>TON Magic</Text>
              <Toggle value={toggle2} onPress={() => setToggle2(!toggle2)}/>
            </TouchableOpacity>
            <View style={styles.divider}/>
            <TouchableOpacity style={styles.menuItem} onPress={_onBackupPress}>
              <Text style={styles.text}>Back Up Secret Words</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={_onSettingsPress}>
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={_onAboutPress}>
              <Text style={styles.text}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={_onExitPress}>
              <Text style={styles.textRed}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  menuBtn: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtn2: {
    marginTop: 20,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtnImg: {
    width: 15,
    height: 11,
  },
  container1: {
    width: 16,
    height: 16,
  },
  container2: {
    flex: 1,
  },
  touchableBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container3: {
    position: 'absolute',
    top: 75,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  menuItem: {
    height: 47,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  menuItemToggle: {
    height: 47,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '600',
  },
  textRed: {
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(132,146,171,0.3)',
  }
})

export default Menu
