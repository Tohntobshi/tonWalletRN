import React, { useState } from 'react'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'
import { useAppSelector } from '../redux'

interface Props {
  onClosePress?: () => void,
  onSuccess?: () => void,
}

const titles = {
  0: 'Safety Rules',
  1: '24 Words',
  2: 'Let’s Check!',
}

function BackupAuth({ onClosePress, onSuccess }: Props): JSX.Element {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onClosePress}>
      {step === 0 && <SafetyRules onUnderstoodPress={() => setStep(1)}/>}
      {step === 1 && <Words mnemonic={mnemonic || []} onCheckPress={() => setStep(2)}/>}
      {step === 2 && <LetsCheck mnemonic={mnemonic || []} onSuccess={onSuccess}
        onBackPress={() => setStep(1)}/>}
    </ModalBottom>
  )
}

export default BackupAuth
