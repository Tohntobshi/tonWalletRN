import React, { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native'

interface Props {
  onRequestClose?: () => void,
  disabledClose?: boolean,
  isOpen?: boolean,
  children?: React.ReactNode,
  modalHeight?: number,
  noBackgroundShade?: boolean,
}

function ModalBottom({ onRequestClose, children,
  isOpen, disabledClose, noBackgroundShade, modalHeight = 600 }: Props): JSX.Element {
  const [isModalVisible, setModalVisible] = useState(isOpen)
  const animState = useRef(new Animated.Value(0)).current
  const containerPosition = useRef(Animated.multiply(animState, -modalHeight)).current
  const _onRequestClose = () => {
    if (disabledClose) return
    onRequestClose && onRequestClose()
  }
  const animate = () => {
    Animated.timing(animState, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
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
      <KeyboardAvoidingView style={styles.container0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {!noBackgroundShade &&
          <Animated.View style={[styles.background, { opacity: animState }]}/>}
        <SafeAreaView style={styles.container2}>
          <Animated.View style={[styles.container3, {
              height: modalHeight,
              bottom: -modalHeight,
              translateY: containerPosition,
            }]}>
            {children}
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container0: {
    flex: 1,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container3: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#F1F5FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
})

export default ModalBottom
