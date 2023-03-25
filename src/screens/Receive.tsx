import React from 'react'
import { View, StyleSheet } from 'react-native'

import { selectCurrentAccount, setReceiveModalOpen,
  useAppDispatch, useAppSelector } from '../redux'

import ModalBottom from '../components/ModalBottom'
import ReceiveStepAddress from './ReceiveSteps/ReceiveStepAddress'
import ModalBottomHeader from '../components/ModalBottomHeader'

interface Props {
  onCancelPress?: () => void,
}

function ReceiveContent({ onCancelPress }: Props): JSX.Element {
  const account = useAppSelector(selectCurrentAccount)
  const address = account?.address || ''
  return (
    <View style={styles.content}>
      <ModalBottomHeader title='Receive TON'
        onRequestClose={onCancelPress}/>
      <ReceiveStepAddress address={address}/>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
})

function Receive(): JSX.Element {
  const dispatch = useAppDispatch()
  const _onClosePress = () => {
    dispatch(setReceiveModalOpen(false))
  }
  const isOpen = useAppSelector(state => state.modals.receive)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      approxModalHeight={350}>
      <ReceiveContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}

export default Receive
