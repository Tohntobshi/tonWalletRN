import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input';

interface Props {
  onContinuePress?: () => void,
}

function SendStep1({ onContinuePress }: Props): JSX.Element {
  const [address, setAddress] = useState('')
  return (
    <View style={styles.page}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Receiving address</Text>
        <Text style={[styles.label2, styles.errorLabel]}>Incorrect address</Text>
      </View>
      <Input style={styles.input1} placeholder='Wallet address or domain' pasteButton value={address} onChangeText={setAddress}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Amount</Text>
        <Text style={[styles.label2, styles.errorLabel]}>Insuffient balance</Text>
      </View>
      <Input style={styles.input1} amountInput placeholder='0'/>
      <View style={styles.feeContainer}></View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Comment</Text>
      </View>
      <Input style={styles.input1} placeholder='Optional'/>
      <Button type='primary' style={styles.btn} onPress={onContinuePress}>Send TON</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    minHeight: 500,
  },
  labelContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: '#0088CC',
    fontSize: 13,
    fontWeight: '700',
  },
  label2: {
    color: '#0088CC',
    fontSize: 13,
    fontWeight: '600',
  },
  errorLabel: {
    color: '#F35B5B',
  },
  input1: {
    marginTop: 6,
  },
  btn: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  feeContainer: {
    marginTop: 6,
    minHeight: 12,
  }
})

export default SendStep1
