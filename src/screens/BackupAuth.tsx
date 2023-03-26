import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'
import ModalBottomHeader from '../components/ModalBottomHeader'
import Transitioner from '../components/Transitioner'
import { completeBackup, setBackupAuthModalOpen,
  useAppDispatch, useAppSelector } from '../redux'


interface WordsStepProps {
  onCheckPress?: () => void,
}
function WordsStep({ onCheckPress }: WordsStepProps) {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  return <Words mnemonic={mnemonic || []} onCheckPress={onCheckPress}/>
}

interface CheckStepProps {
  onBackPress?: () => void,
  onSuccess?: () => void,
}

function CheckStep({ onBackPress, onSuccess }: CheckStepProps) {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  return <LetsCheck mnemonic={mnemonic || []} onSuccess={onSuccess}
    onBackPress={onBackPress}/>
}

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
  const [step, setStep] = useState(0)
  return (
    <View style={styles.content}>
      <ModalBottomHeader title={(titles as any)[step]} onRequestClose={onClosePress}/>
      <Transitioner style={styles.transitioner} active={step} elements={[
        <SafetyRules onUnderstoodPress={() => setStep(1)}/>,
        <WordsStep onCheckPress={() => setStep(2)}/>,
        <CheckStep onSuccess={onSuccess} onBackPress={() => setStep(1)}/>
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

function BackupAuth(): JSX.Element {
  const dispatch = useAppDispatch()
  const onClosePress = () => dispatch(setBackupAuthModalOpen(false))
  const onComplete = () => {
    dispatch(completeBackup())
  }
  const isOpen = useAppSelector(state => state.modals.backupAuth)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={onClosePress}>
      <BackupAuthContent
        onClosePress={onClosePress}
        onSuccess={onComplete} />
    </ModalBottom>
  )
}

export default BackupAuth
