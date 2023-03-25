import React from 'react'
import { View, StyleSheet } from 'react-native'

import { selectCurrentAccount, setReceiveQRModalOpen,
  useAppDispatch, useAppSelector } from '../redux'

import ModalBottom from '../components/ModalBottom'
import ReceiveStepQR from './ReceiveSteps/ReceiveStepQR'
import ModalBottomHeader from '../components/ModalBottomHeader'

interface Props {
  onCancelPress?: () => void,
}

function ReceiveContent({ onCancelPress }: Props): JSX.Element {
  const account = useAppSelector(selectCurrentAccount)
  const address = account?.address || ''
  return (
    <View style={styles.content}>
      <ModalBottomHeader title='QR-code'
        onRequestClose={onCancelPress}/>
      <ReceiveStepQR
        address={address}
        onBackPress={onCancelPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
})

function ReceiveQR(): JSX.Element {
  const dispatch = useAppDispatch()
  const _onClosePress = () => {
    dispatch(setReceiveQRModalOpen(false))
  }
  const isOpen = useAppSelector(state => state.modals.receiveQR)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      noBackgroundShade
      modalHeight={500}>
      <ReceiveContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}

export default ReceiveQR
