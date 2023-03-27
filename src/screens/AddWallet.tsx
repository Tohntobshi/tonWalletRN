import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'
import Button from '../components/Button'

import ModalBottom from '../components/ModalBottom'
import EnterPasswordStep from './EnterPasswordStep'
import { addNextWallet, setAuthPasswordError, useAppDispatch,
  useAppSelector, resetAuth, setAddWalletModalOpen } from '../redux'
import ModalBottomHeader from '../components/ModalBottomHeader'
import Transitioner from '../components/Transitioner'

interface ChooseStepProps {
  onCreatePress?: () => void,
  onImportPress?: () => void,
}

function ChooseStep({ onCreatePress, onImportPress }: ChooseStepProps) {
  return <View style={styles.step}>
    <Lottie source={require('../../assets/bird7.json')}
      autoPlay loop style={styles.logoImage}/>
    <Text style={styles.text}>MyTonWallet allows you to seamlessly
      switch between multiple accounts.</Text>
    <Text style={styles.text}>Try it by creating a new wallet,
      or importing any of your existing ones
      using 24 secret words.</Text>
    <Button type='primary' style={styles.createBtn}
      onPress={onCreatePress}>Create Wallet</Button>
    <Button type='link' style={styles.mnemonicLink}
      onPress={onImportPress}>Import From 24 Secret Words</Button>
  </View>
}

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
    onChange={onPasswordChange} isLoading={isLoading}
    placeholder='Enter your password'/>
}

interface Props {
  onCancelPress?: () => void,
}

const titles = {
  0: 'Add Wallet',
  1: 'Enter Password',
}

function AddWalletContent({ onCancelPress }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const [step, setStep] = useState(0)
  const [isImported, setIsImported] = useState(false)
  const onCreatePress = () => {
    setStep(1)
    setIsImported(false)
  }
  const onImportPress = () => {
    setStep(1)
    setIsImported(true)
  }
  const onContinuePress = (password: string) => {
    dispatch(addNextWallet({ password, isImported }))
  }
  return (
    <View style={styles.container}>
      <ModalBottomHeader title={(titles as any)[step]}
        onRequestClose={onCancelPress} disabledClose={isLoading}/>
      <Transitioner style={styles.transitioner} active={step} elements={[
        <ChooseStep onCreatePress={onCreatePress}
          onImportPress={onImportPress} />,
        <PasswordStep onPasswordConfirm={onContinuePress}
          onBackPress={() => setStep(0)}/>,
      ]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  transitioner: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    minHeight: 500,
  },
  step: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  logoImage: {
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

function AddWallet(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const _onClosePress = () => {
    dispatch(setAddWalletModalOpen(false))
    dispatch(resetAuth())
  }
  const isOpen = useAppSelector(state => state.modals.addWallet)
  return (
    <ModalBottom
      isOpen={isOpen}
      onRequestClose={_onClosePress}
      disabledClose={isLoading}
      shiftUnderKeyboard={100}>
      <AddWalletContent onCancelPress={_onClosePress}/>
    </ModalBottom>
  )
}

export default AddWallet
