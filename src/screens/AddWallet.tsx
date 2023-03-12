import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Button from '../components/Button'

import ModalBottom from '../components/ModalBottom'
import EnterPasswordStep from './EnterPasswordStep'

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Add Wallet',
  1: 'Enter Password',
}

function AddWallet({ onCancelPress }: Props): JSX.Element {
  const [step, setStep] = useState(0)
  return (
    <ModalBottom
      title={(titles as any)[step]}
      visible={true}
      onRequestClose={onCancelPress}>
      {step === 0 && <View style={styles.step}>
        <Image
          source={require('../../assets/bird7.png')}
          style={styles.logoImage}
          />
        <Text style={styles.text}>MyTonWallet allows you to seamlessly
          switch between multiple accounts.</Text>
        <Text style={styles.text}>Try it by creating a new wallet,
          or importing any of your existing ones
          using 24 secret words.</Text>
        <Button type='primary' style={styles.createBtn} onPress={() => setStep(1)}>Create Wallet</Button>
        <Button type='link' style={styles.mnemonicLink} onPress={() => setStep(1)}>Import From 24 Secret Words</Button>
      </View>}
      {step === 1 && <EnterPasswordStep onContinuePress={() => {}} onBackPress={() => setStep(0)} placeholder='Enter your password'/>}
    </ModalBottom>
  )
}

const styles = StyleSheet.create({
  step: {
    alignItems: 'center',
    minHeight: 500,
  },
  logoImage: {
    marginTop: 16,
    width: 160,
    height: 160,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 24,
    color: '#53657B',
  },
  createBtn: {
    marginTop: 'auto',
  },
  mnemonicLink: {
    marginTop: 22,
    marginBottom: 15,
  },
})

export default AddWallet
