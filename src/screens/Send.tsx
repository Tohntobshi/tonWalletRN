import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ModalBottom from '../components/ModalBottom'
import SendStep1 from './SendSteps/SendStep1'
import SendStep2 from './SendSteps/SendStep2'

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Send TON',
  1: 'Is it all ok?',
}

function Send({ onCancelPress }: Props): JSX.Element {
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onCancelPress}>
      {step === 0 && <SendStep1 onContinuePress={() => setStep(1)}/>}
      {step === 1 && <SendStep2 onContinuePress={() => setStep(2)} onEditPress={() => setStep(0)}/>}
    </ModalBottom>
  )
}

const styles = StyleSheet.create({

})

export default Send
