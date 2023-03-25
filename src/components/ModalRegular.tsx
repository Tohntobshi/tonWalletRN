import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  onRequestClose?: () => void,
  title: string,
  isOpen?: boolean,
  children?: React.ReactNode,
}

const scaleInterpolationRange = { inputRange: [0,1], outputRange: [0.8, 1]}

function ModalRegular({ onRequestClose, title, children, isOpen }: Props): JSX.Element {
  const [isModalVisible, setModalVisible] = useState(isOpen)
  const animState = useRef(new Animated.Value(0)).current
  const animate = () => {
    Animated.timing(animState, {
      toValue: isOpen ? 1 : 0,
      duration: 150,
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
    <Modal transparent onRequestClose={onRequestClose}  visible={isModalVisible}>
      <View style={styles.container1}>
        <Animated.View style={[styles.background, { opacity: animState }]}/>
        <Animated.View style={[styles.container2, {
          opacity: animState,
          scaleX: animState.interpolate(scaleInterpolationRange),
          scaleY: animState.interpolate(scaleInterpolationRange),
        }]}>
          <View style={styles.container3}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={[]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    backgroundColor: '#F1F5FA',
    borderRadius: 16,
    padding: 16,
  },
  container3: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#313D4F',
    fontSize: 17,
    fontWeight: '700',
  },
})

export default ModalRegular
