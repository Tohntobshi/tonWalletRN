import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'

interface Props {
  onClosePress?: () => void,
  onContinuePress?: () => void,
}

const titles = {
  0: 'Safety Rules',
  1: '24 Words',
  2: 'Let’s Check!',
}

function Backup({ onClosePress, onContinuePress }: Props): JSX.Element {
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onClosePress}>
      {step === 0 && <SafetyRules onUnderstoodPress={() => setStep(1)}/>}
      {step === 1 && <Words onCheckPress={() => setStep(2)}/>}
      {step === 2 && <LetsCheck onContinuePress={onContinuePress} onBackPress={() => setStep(1)}/>}
    </ModalBottom>
  )
}

const styles = StyleSheet.create({

})

export default Backup
