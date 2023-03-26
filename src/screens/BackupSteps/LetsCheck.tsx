import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { selectMnemonicForCheck } from '../../utils'

interface Props {
  onBackPress?: () => void,
  onSuccess?: () => void,
  mnemonic: string[]
}
const defaultInputValues = Array.from({ length: 3 }).map(() => '')

function LetsCheck({ onSuccess, onBackPress, mnemonic }: Props): JSX.Element {
  const chosenIdxs = useMemo(() => selectMnemonicForCheck(), [])
  const [inputs, setInputs] = useState(defaultInputValues)
  const [error, setError] = useState('')
  const onChange = (index: number) => (value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
    setError('')
  }
  const onContinuePress = () => {
    const words = inputs.map(el => el.toLowerCase().trim())
    const isEqual = chosenIdxs
      .map((chosen, index) => words[index] === mnemonic[chosen])
      .reduce((acc, cur) => acc && cur, true)
    if (!isEqual) {
      setError('The secret words you have entered do not match the ones in the list. Please try again.')
      return
    }
    Keyboard.dismiss()
    onSuccess && onSuccess()
  }
  const isFilled = inputs.reduce((acc, cur) => !!cur && acc, true)
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Now let’s check that you wrote your
        secret words correctly.</Text>
      <Text style={styles.text}>Please enter the words{' '}
        {chosenIdxs[0] + 1}, {chosenIdxs[1] + 1}, {chosenIdxs[2] + 1} below:</Text>
      {chosenIdxs.map((chosen, index) => <Input key={index} prefix={(chosen + 1).toString()}
        style={index ? styles.input2 : styles.input1} value={inputs[index]}
        onChangeText={onChange(index)} error={!!error}/>)}
      {!!error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1}
          onPress={onBackPress}>Back</Button>
        <Button type='primary' style={styles.btn2}
          onPress={onContinuePress} disabled={!isFilled || !!error}>Continue</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    color: '#53657B',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  input1: {
    marginTop: 24,
  },
  input2: {
    marginTop: 16,
  },
  error: {
    color: '#F35B5B',
    marginTop: 24,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
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
  },
})

export default LetsCheck
