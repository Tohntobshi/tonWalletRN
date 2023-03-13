import React from 'react'
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
}

function ReceiveStepInvoice({ onBackPress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>You can specify the amount and purpose of
        the payment to save the sender some time</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label1}>Amount</Text>
      </View>
      <Input style={styles.input1} amountInput placeholder='0'/>
      <View style={styles.labelContainer}>
        <Text style={styles.label1}>Comment</Text>
      </View>
      <Input style={styles.input1} placeholder='Optional'/>
      <View style={styles.labelContainer}>
        <Text style={styles.label2}>Share this URL to receive TON</Text>
      </View>
      <OutputWithActions style={styles.input1} text='ton://transfer/1Q5VX7SD4KD98S3R1Q5VXSD4KD98QKD98S3R1QX' frame copy/>
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
