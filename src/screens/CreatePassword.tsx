import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../components/Button'
import Input from '../components/Input'
import InsecurePassword from './InsecurePassword'

import { finishPasswordCreation, resetAuth, useAppDispatch, useAppSelector } from '../redux'
import { usePasswordValidation } from '../hooks/usePasswordValidation'

function CreatePassword(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isAuthLoading)
  const onCancelPress = () => dispatch(resetAuth())
  const [isInsecurePasswordModalOpen, setInsecurePasswordModalOpen] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const validation = usePasswordValidation({
    firstPassword: password1, secondPassword: password2 })
  const setFirstPassword = (value: string) => {
    setPassword1(value)
    setError('')
  }
  const setSecondPassword = (value: string) => {
    setPassword2(value)
    setError('')
  }
  const onContinuePress2 = () => {
    if (isLoading) return
    setInsecurePasswordModalOpen(false)
    dispatch(finishPasswordCreation(password1))
  }
  const onContinuePress1 = () => {
    if (validation.noEqual) {
      setError('Passwords must be equal.')
      return
    }
    const isWeakPassword = Object.values(validation).find((rule) => rule)
    if (isWeakPassword) {
      setInsecurePasswordModalOpen(true)
      return
    }
    onContinuePress2()
  }
  
  return (
    <View style={styles.page} >
      <KeyboardAvoidingView style={styles.scrollViewContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            source={require('../../assets/bird2.png')}
            style={styles.logoImage}/>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.text1}>The wallet is ready.</Text>
          <Text style={styles.text2}>Create a password to protect it.</Text>
          <Input style={styles.input1} placeholder='Password'
            error={!!error} editable={!isLoading}
            value={password1} onChangeText={setFirstPassword}/>
          <Input style={styles.input2} placeholder='Repeat password'
            error={!!error} editable={!isLoading}
            value={password2} onChangeText={setSecondPassword}/>
          {!!error ? <Text style={styles.error}>{error}</Text> 
            : <Text style={styles.text3}>To protect your wallet as much as possible,
            use a password with at least 8 characters, one
            small letter, one capital letter, one digit and one
            special character.</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <Button type={'secondary'} style={styles.btn1}
          disabled={isLoading}
          onPress={onCancelPress}>Cancel</Button>
        <Button type={'primary'} style={styles.btn2}
          disabled={!password1 || !password2 || !!error || isLoading}
          onPress={onContinuePress1}>Continue</Button>
      </View>
      {isInsecurePasswordModalOpen && <InsecurePassword
        onCancelPress={() => setInsecurePasswordModalOpen(false)}
        onContinuePress={onContinuePress2}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoImage: {
    marginTop: 50,
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
  text1: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#53657B',
  },
  text2: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    color: '#53657B',
  },
  text3: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 8,
    color: '#53657B',
  },
  error: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 8,
    color: '#F35B5B',
  },
  input1: {
    marginTop: 32,
  },
  input2: {
    marginTop: 16,
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

export default CreatePassword
