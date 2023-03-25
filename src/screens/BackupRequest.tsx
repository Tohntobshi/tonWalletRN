import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'
import EnterPasswordStep from './EnterPasswordStep'
import ModalBottomHeader from '../components/ModalBottomHeader'

import { completeBackup, requestMnemonic, resetAuth, setAuthPasswordError,
  setBackupRequestModalOpen, useAppDispatch, useAppSelector } from '../redux'


interface Props {
  onClosePress?: () => void,
}

const titles = {
  0: 'Safety Rules',
  1: 'Enter Password',
  2: '24 Words',
  3: 'Let’s Check!',
}

function BackupRequestContent({ onClosePress }: Props): JSX.Element {
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  const [step, setStep] = useState(0)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.passwordError)
  const [password, setPassword] = useState('')
  const onPasswordChange = (val: string) => {
    if (error) dispatch(setAuthPasswordError())
    setPassword(val)
  }

  const _onSuccess = () => {
    dispatch(completeBackup())
    dispatch(setBackupRequestModalOpen(false))
  }
  const onPasswordConfirm = () => {
    dispatch(requestMnemonic({ password }))
    setStep(2)
  }
  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]}
        onRequestClose={onClosePress} disabledClose={isLoading}/>
      {step === 0 && <SafetyRules onUnderstoodPress={() => setStep(1)}/>}
      {(step === 1 || (step > 0 && !mnemonic)) && <EnterPasswordStep
        onContinuePress={onPasswordConfirm} onBackPress={() => setStep(0)} error={error}
        value={password} onChange={onPasswordChange} isLoading={isLoading}/>}
      {step === 2 && !!mnemonic && <Words mnemonic={mnemonic} onCheckPress={() => setStep(3)}/>}
      {step === 3 && !!mnemonic && <LetsCheck mnemonic={mnemonic} onSuccess={_onSuccess}
        onBackPress={() => setStep(2)}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    minHeight: 550,
  },
})

function BackupRequest(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const _onClosePress = () => {
    dispatch(setBackupRequestModalOpen(false))
    dispatch(resetAuth())
  }
  const isOpen = useAppSelector(state => state.modals.backupRequest)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      disabledClose={isLoading}>
      <BackupRequestContent onClosePress={_onClosePress}/>
    </ModalBottom>
  )
}

export default BackupRequest
