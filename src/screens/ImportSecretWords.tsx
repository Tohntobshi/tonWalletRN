import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

import Button from '../components/Button'
import Input from '../components/Input'
import {
  importWallet,
  resetAuth,
  setAuthMnemonicError,
  useAppDispatch,
  useAppSelector,
} from '../redux'

// const defaultInputValues = Array.from({ length: 24 }).map(() => '')
// const defaultInputValues = 'sun give drum gun fitness spread thought reopen prepare broken knee remind deposit stem dinner isolate speed trumpet alpha popular magnet enough provide rival'.split(' ')
const defaultInputValues = 'bless school renew drama tray marriage accident below act build fog clay shrimp napkin grunt moment helmet rally cloud camera segment assume valve supply'.split(' ')

function ImportSecretWords(): JSX.Element {
  const dispatch = useAppDispatch()
  const onCancelPress = () => dispatch(resetAuth())
  const error = useAppSelector(state => state.auth.mnemonicError)
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const [inputs, setInputs] = useState(defaultInputValues)
  const onContinuePress = () => dispatch(importWallet(inputs))
  const onChange = (index: number) => (value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
    if (error) dispatch(setAuthMnemonicError())
  }
  const isFilled = inputs.reduce((acc, cur) => !!cur && acc, true)
  return (
    <View style={styles.page}>
      <KeyboardAvoidingView style={styles.scrollViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Lottie source={require('../../assets/bird3.json')}
            autoPlay loop style={styles.logoImage}/>
          <Text style={styles.title}>24 Secret Words</Text>
          <Text style={styles.text}>Please restore access to your non-hardware
            wallet by entering the 24 secret words you
            wrote down when creating the wallet.</Text>
          <View style={styles.wordsContainer}>
            {[0, 1].map((colIndex) => <View key={colIndex}
              style={[styles.column, !!colIndex && styles.secondCol]}>
              {Array.from({ length: 12 }).map((_, wordIndex) => {
                const absIndex = wordIndex + 12 * colIndex
                return <Input key={absIndex} prefix={`${(absIndex + 1)}`}
                  value={inputs[absIndex]} onChangeText={onChange(absIndex)}
                  style={styles.input} editable={!isLoading}/>
              })}
            </View>)}
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <Button type={'secondary'} style={styles.btn1}
          disabled={isLoading}
          onPress={onCancelPress}>Cancel</Button>
        <Button type={'primary'} style={styles.btn2} onPress={onContinuePress}
          disabled={!isFilled || !!error || isLoading}>Continue</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 32,
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
    color: '#313D4F',
  },
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    color: '#53657B',
  },
  wordsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  column: {
    flex: 1,
  },
  secondCol: {
    marginLeft: 17,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    flexShrink: 0,
  },
  btn1: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btn2: {
    flex: 1,
    marginLeft: 15,
    paddingHorizontal: 20,
  }
})

export default ImportSecretWords
