import React, { useState } from 'react'

import { selectCurrentAccount, useAppSelector } from '../redux'

import ModalBottom from '../components/ModalBottom'
import ReceiveStepAddress from './ReceiveSteps/ReceiveStepAddress'
import ReceiveStepInvoice from './ReceiveSteps/ReceiveStepInvoice'
import ReceiveStepQR from './ReceiveSteps/ReceiveStepQR'

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Receive TON',
  1: 'QR-code',
  2: 'Create Invoice',
}

function Receive({ onCancelPress }: Props): JSX.Element {
  const account = useAppSelector(selectCurrentAccount)
  const address = account?.address || ''
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onCancelPress}>
      {step === 0 && <ReceiveStepAddress
        onQRPress={() => setStep(1)} 
        onInvoicePress={() => setStep(2)}
        address={address}/>}
      {step === 1 && <ReceiveStepQR
        onBackPress={() => setStep(0)}
        address={address}/>}
      {step === 2 && <ReceiveStepInvoice
        onBackPress={() => setStep(0)}
        address={address}/>}
    </ModalBottom>
  )
}

export default Receive
