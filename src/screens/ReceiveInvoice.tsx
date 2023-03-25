import React from 'react'
import { View, StyleSheet } from 'react-native'

import { selectCurrentAccount, setReceiveInvoiceModalOpen,
  useAppDispatch, useAppSelector } from '../redux'

import ModalBottom from '../components/ModalBottom'
import ReceiveStepInvoice from './ReceiveSteps/ReceiveStepInvoice'
import ModalBottomHeader from '../components/ModalBottomHeader'

interface Props {
  onCancelPress?: () => void,
}

function ReceiveContent({ onCancelPress }: Props): JSX.Element {
  const account = useAppSelector(selectCurrentAccount)
  const address = account?.address || ''
  return (
    <View style={styles.content}>
      <ModalBottomHeader title='Create Invoice'
        onRequestClose={onCancelPress}/>
      <ReceiveStepInvoice
        onBackPress={onCancelPress}
        address={address}/>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
})

function ReceiveInvoice(): JSX.Element {
  const dispatch = useAppDispatch()
  const _onClosePress = () => {
    dispatch(setReceiveInvoiceModalOpen(false))
  }
  const isOpen = useAppSelector(state => state.modals.receiveInvoice)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      noBackgroundShade>
      <ReceiveContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}

export default ReceiveInvoice
