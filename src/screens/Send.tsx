import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SendStep1 from './SendSteps/SendStep1'
import SendStep2 from './SendSteps/SendStep2'
import EnterPasswordStep from './EnterPasswordStep'
import SendStep4 from './SendSteps/SendStep4'
import { useAppDispatch, useAppSelector, setCurrentTransferState,
  send, selectCurrentAccountTokens,
  setCurrentTransferError, gracefulyCloseSendModal } from '../redux'
import { TransferState } from '../types'
import ModalBottomHeader from '../components/ModalBottomHeader'
import Transitioner from '../components/Transitioner'


function PasswordStep() {
  const dispatch = useAppDispatch()
  const userTokens = useAppSelector(selectCurrentAccountTokens)
  const toncoin = userTokens?.find((el) => el.slug === 'toncoin')
  const error = useAppSelector(state => state.currentTransfer.error)
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)
  const [password, setPassword] = useState('')
  const onPasswordChange = (val: string) => {
    if (error) dispatch(setCurrentTransferError())
    setPassword(val)
  }
  const onPasswordConfirm = () => {
    dispatch(send({ password, initialBalance: toncoin?.amount || 0 }))
  }
  const onBackPress = () => {
    dispatch(setCurrentTransferState(TransferState.None))
  }
  return <EnterPasswordStep onContinuePress={onPasswordConfirm}
    onBackPress={onBackPress} error={error} value={password}
    onChange={onPasswordChange} isLoading={isLoading}/>
}

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Send TON',
  1: 'Is it all ok?',
  2: 'Confirm Transaction',
  3: 'Coins have been sent!',
}

function SendContent({ onCancelPress }: Props): JSX.Element {
  const step = useAppSelector(state => state.currentTransfer.state)
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)

  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]}
        onRequestClose={onCancelPress} disabledClose={isLoading}/>
      <Transitioner style={styles.transitioner} active={step} elements={[
          <SendStep1/>,
          <SendStep2 />,
          <PasswordStep />,
          <SendStep4 onClosePress={onCancelPress}/>
        ]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  transitioner: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    minHeight: 550
  },
})

function Send(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)
  const _onClosePress = () => {
    dispatch(gracefulyCloseSendModal())
  }
  const isOpen = useAppSelector(state => state.modals.send)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      disabledClose={isLoading}
      shiftUnderKeyboard={150}>
      <SendContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}


export default Send
