import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import KeyboardAvoidingViewForModal from './KeyboardAvoidingViewForModal'

interface Props {
  onRequestClose?: () => void,
  disabledClose?: boolean,
  isOpen?: boolean,
  children?: React.ReactNode,
  approxModalHeight?: number,
  noBackgroundShade?: boolean,
  shiftUnderKeyboard?: number
}

function ModalBottom({ onRequestClose, children, shiftUnderKeyboard,
  isOpen, disabledClose, noBackgroundShade, approxModalHeight = 600 }: Props): JSX.Element {
  const [isModalVisible, setModalVisible] = useState(isOpen)
  const animState = useRef(new Animated.Value(0)).current
  const containerPosition = useRef(Animated.multiply(Animated.add(animState, -1), -approxModalHeight)).current
  const _onRequestClose = () => {
    if (disabledClose) return
    onRequestClose && onRequestClose()
  }
  const animate = () => {
    Animated.timing(animState, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!isOpen) setModalVisible(false)
    })
  }
  useEffect(() => {
    if (isOpen) setModalVisible(true)
    animate()
  }, [isOpen])
  return (
    <Modal transparent onRequestClose={_onRequestClose}
      visible={isModalVisible}>
        {!noBackgroundShade &&
          <Animated.View style={[styles.background, { opacity: animState }]}/>}
        <SafeAreaView style={styles.container1}>
          <KeyboardAvoidingViewForModal shift={shiftUnderKeyboard}>
            <View style={styles.container2}>
              <Animated.View style={[styles.container3, {
                  translateY: containerPosition,
                  opacity: animState
                }]}>
                {children}
              </Animated.View>
            </View>
          </KeyboardAvoidingViewForModal>
        </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container1: {
    flexGrow: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container3: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F1F5FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
  },
})

export default ModalBottom
