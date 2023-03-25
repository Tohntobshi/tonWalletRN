import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SendStep1 from './SendSteps/SendStep1'
import SendStep2 from './SendSteps/SendStep2'
import EnterPasswordStep from './EnterPasswordStep'
import SendStep4 from './SendSteps/SendStep4'
import { useAppDispatch, useAppSelector, setCurrentTransferState,
  resetCurrentTransfer, validateSendRequest, send,
  selectCurrentAccountTokens, setCurrentTransferError, setSendModalOpen } from '../redux'
import { TransferState } from '../types'
import { bigStrToHuman } from '../utils'
import ModalBottomHeader from '../components/ModalBottomHeader'

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
  const dispatch = useAppDispatch()
  const userTokens = useAppSelector(selectCurrentAccountTokens)
  const toncoin = userTokens?.find((el) => el.slug === 'toncoin')
  const { state: step, error, amount, fee, comment, toAddress, initialBalance } =
    useAppSelector(state => state.currentTransfer)
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)
  const onAnyChange = () => {
    if (error) dispatch(setCurrentTransferError())
  }

  const [password, setPassword] = useState('')
  const onPasswordChange = (val: string) => {
    onAnyChange()
    setPassword(val)
  }

  const onFirstStepConfirmPress = (address: string, amount: number, comment: string) => {
    dispatch(validateSendRequest({ slug: 'toncoin', address, amount, comment }))
  }
  const onPasswordStepConfirmPress = () => {
    dispatch(send({ password, initialBalance: toncoin?.amount || 0 }))
  }
  const onEditPress = () => {
    dispatch(setCurrentTransferState(TransferState.None))
  }
  const onBackFromPasswordPress = () => {
    dispatch(setCurrentTransferState(TransferState.None))
  }
  const onProceedToPasswordPress = () => {
    dispatch(setCurrentTransferState(TransferState.Password))
  }
  const feeReadable = bigStrToHuman(fee || '0', toncoin?.decimals)
  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]}
        onRequestClose={onCancelPress} disabledClose={isLoading}/>
      {step === TransferState.None && <SendStep1
        balance={toncoin?.amount || 0}
        symbol={toncoin?.symbol || ''}
        onContinuePress={onFirstStepConfirmPress}
        onAnyChange={onAnyChange}
        error={error}
        isLoading={isLoading}/>}
      {step === TransferState.Confirm && <SendStep2
        amount={amount || 0}
        symbol={toncoin?.symbol || ''}
        address={toAddress || ''}
        fee={feeReadable}
        comment={comment}
        onContinuePress={onProceedToPasswordPress}
        onEditPress={onEditPress}/>}
      {step === TransferState.Password && <EnterPasswordStep
        value={password} onChange={onPasswordChange} 
        onContinuePress={onPasswordStepConfirmPress}
        onBackPress={onBackFromPasswordPress}
        isLoading={isLoading} error={error}/>}
      {step === TransferState.Complete && <SendStep4
        initialBalance={initialBalance || 0}
        amount={amount || 0}
        symbol={toncoin?.symbol || ''}
        fee={feeReadable}
        price={toncoin?.price || 0}
        onClosePress={onCancelPress}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
})

function Send(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)
  const _onClosePress = () => {
    dispatch(setSendModalOpen(false))
    dispatch(resetCurrentTransfer())
  }
  const isOpen = useAppSelector(state => state.modals.send)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      disabledClose={isLoading}
      modalHeight={550}>
      <SendContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}


export default Send
