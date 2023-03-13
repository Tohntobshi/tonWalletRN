import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'

interface Props {
  onBackPress?: () => void,
  onContinuePress?: () => void,
}

function LetsCheck({ onContinuePress, onBackPress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Now let’s check that you wrote your
        secret words correctly.</Text>
      <Text style={styles.text}>Please enter the words 12, 14, 22 below:</Text>
      <Input prefix='12' style={styles.input1}/>
      <Input prefix='14' style={styles.input2}/>
      <Input prefix='22' style={styles.input2}/>
      <Text style={styles.error}>The secret words you have entered do not
        match the ones in the list. Please try again.</Text>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1} onPress={onBackPress}>Back</Button>
        <Button type='primary' style={styles.btn2} onPress={onContinuePress}>Continue</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
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
    marginTop: 16,
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
