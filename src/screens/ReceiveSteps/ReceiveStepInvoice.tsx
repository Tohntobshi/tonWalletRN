import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'
import OutputWithActions from '../../components/OutputWithActions'

interface Props {
  onBackPress?: () => void,
  address: string,
}

function ReceiveStepInvoice({ onBackPress, address }: Props): JSX.Element {
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const amountNumber = parseFloat(amount)
  const commentToAdd = comment ? 'comment=' + encodeURI(comment) : ''
  const amountToAdd = Number.isNaN(amountNumber) ? '' : 'amount=' + Math.floor(amountNumber * 1e9)
  const params = [commentToAdd, amountToAdd].filter(el => el).join('&')
  const link = 'ton://transfer/' + address + (params && '?' + params)
  return (
    <View style={styles.page}>
      <Text style={styles.text}>You can specify the amount and purpose of
        the payment to save the sender some time</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label1}>Amount</Text>
      </View>
      <Input style={styles.input1} amountInput placeholder='0'
        value={amount} onChangeText={setAmount}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label1}>Comment</Text>
      </View>
      <Input style={styles.input1} placeholder='Optional'
        value={comment} onChangeText={setComment}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label2}>Share this URL to receive TON</Text>
      </View>
      <OutputWithActions style={styles.input1} text={link} frame copy/>
      <Button type='secondary' style={styles.btn} onPress={onBackPress}>Back</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    color: '#53657B',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  labelContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label1: {
    color: '#0088CC',
    fontSize: 13,
    fontWeight: '700',
  },
  label2: {
    color: '#798795',
    fontSize: 13,
    fontWeight: '700',
  },
  input1: {
    marginTop: 6,
  },
  btn: {
    marginTop: 24,
  },
})

export default ReceiveStepInvoice
