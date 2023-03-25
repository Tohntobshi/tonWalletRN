import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'
import ModalBottomHeader from '../components/ModalBottomHeader'
import { completeBackup, setBackupAuthModalOpen,
  useAppDispatch, useAppSelector } from '../redux'

interface ContentProps {
  onClosePress?: () => void,
  onSuccess?: () => void,
}

const titles = {
  0: 'Safety Rules',
  1: '24 Words',
  2: 'Let’s Check!',
}

function BackupAuthContent({ onClosePress, onSuccess }: ContentProps): JSX.Element {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  const [step, setStep] = useState(0)
  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]} onRequestClose={onClosePress}/>
      {step === 0 && <SafetyRules onUnderstoodPress={() => setStep(1)}/>}
      {step === 1 && <Words mnemonic={mnemonic || []} onCheckPress={() => setStep(2)}/>}
      {step === 2 && <LetsCheck mnemonic={mnemonic || []} onSuccess={onSuccess}
        onBackPress={() => setStep(1)}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    minHeight: 550
  },
})

function BackupAuth(): JSX.Element {
  const dispatch = useAppDispatch()
  const onSkipPress = () => dispatch(setBackupAuthModalOpen(false))
  const onComplete = () => {
    dispatch(setBackupAuthModalOpen(false))
    dispatch(completeBackup())
  }
  const isOpen = useAppSelector(state => state.modals.backupAuth)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={onSkipPress}>
      <BackupAuthContent
        onClosePress={onSkipPress}
        onSuccess={onComplete} />
    </ModalBottom>
  )
}

export default BackupAuth
