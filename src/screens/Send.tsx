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

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Send TON'
}

function Send({ onCancelPress }: Props): JSX.Element {
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onCancelPress}>
      {step === 0 && <SendStep1 onContinuePress={() => setStep(1)}/>}
    </ModalBottom>
  )
}

const styles = StyleSheet.create({

})

export default Send
