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
import Transitioner from '../components/Transitioner'



interface PasswordStepProps {
  onPasswordConfirm: (val: string) => void,
  onBackPress: () => void,
}

function PasswordStep({ onPasswordConfirm, onBackPress }: PasswordStepProps) {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.passwordError)
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const [password, setPassword] = useState('')
  const onPasswordChange = (val: string) => {
    if (error) dispatch(setAuthPasswordError())
    setPassword(val)
  }
  return <EnterPasswordStep onContinuePress={() => onPasswordConfirm(password)}
    onBackPress={onBackPress} error={error} value={password}
    onChange={onPasswordChange} isLoading={isLoading}/>
}

interface WordsStepProps {
  onCheckPress: () => void,
}
function WordsStep({ onCheckPress }: WordsStepProps) {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  return <Words mnemonic={mnemonic || []} onCheckPress={onCheckPress}/>
}

interface CheckStepProps {
  onBackPress: () => void,
}

function CheckStep({ onBackPress }: CheckStepProps) {
  const onSuccess = () => {
    dispatch(completeBackup())
    dispatch(setBackupRequestModalOpen(false))
  }
  const dispatch = useAppDispatch()
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  return <LetsCheck mnemonic={mnemonic || []} onSuccess={onSuccess}
    onBackPress={onBackPress}/>
}

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

  const onPasswordConfirm = (password: string) => {
    dispatch(requestMnemonic({ password }))
    setStep(2)
  }

  const getActiveScreen = () => {
    if (step === 0) return 0
    if (step === 1 || (step > 0 && !mnemonic)) return 1
    if (step === 2 && !!mnemonic) return 2
    if (step === 3 && !!mnemonic) return 3
    return 0
  }

  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]}
        onRequestClose={onClosePress} disabledClose={isLoading}/>
      <Transitioner style={styles.transitioner} active={getActiveScreen()} elements={[
        <SafetyRules onUnderstoodPress={() => setStep(1)}/>,
        <PasswordStep onPasswordConfirm={onPasswordConfirm} onBackPress={() => setStep(0)}/>,
        <WordsStep onCheckPress={() => setStep(3)}/>,
        <CheckStep onBackPress={() => setStep(2)}/>
      ]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    minHeight: 550,
  },
  transitioner: {
    flexGrow: 1,
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
