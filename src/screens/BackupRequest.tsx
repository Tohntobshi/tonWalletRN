import React, { useState } from 'react'

import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'
import EnterPasswordStep from './EnterPasswordStep'
import { completeBackup, requestMnemonic, resetAuth, setAuthPasswordError,
  useAppDispatch, useAppSelector } from '../redux'

interface Props {
  onClosePress?: () => void,
  onSuccess?: () => void,
}

const titles = {
  0: 'Safety Rules',
  1: 'Enter Password',
  2: '24 Words',
  3: 'Let’s Check!',
}

function BackupRequest({ onClosePress, onSuccess }: Props): JSX.Element {
  const mnemonic = useAppSelector(state => state.auth.mnemonic)
  const [step, setStep] = useState(0)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.passwordError)
  const [password, setPassword] = useState('')
  const onPasswordChange = (val: string) => {
    if (error) dispatch(setAuthPasswordError())
    setPassword(val)
  }
  const _onClosePress = () => {
    dispatch(resetAuth())
    onClosePress && onClosePress()
  }
  const _onSuccess = () => {
    dispatch(completeBackup())
    onSuccess && onSuccess()
  }
  const onPasswordConfirm = () => {
    dispatch(requestMnemonic({ password }))
    setStep(2)
  }
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={_onClosePress}>
      {step === 0 && <SafetyRules onUnderstoodPress={() => setStep(1)}/>}
      {(step === 1 || (step > 0 && !mnemonic)) && <EnterPasswordStep
        onContinuePress={onPasswordConfirm} onBackPress={() => setStep(1)} error={error}
        value={password} onChange={onPasswordChange} />}
      {step === 2 && !!mnemonic && <Words mnemonic={mnemonic} onCheckPress={() => setStep(3)}/>}
      {step === 3 && !!mnemonic && <LetsCheck mnemonic={mnemonic} onSuccess={_onSuccess}
        onBackPress={() => setStep(2)}/>}
    </ModalBottom>
  )
}

export default BackupRequest
