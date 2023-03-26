import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'
import OutputWithActions from '../../components/OutputWithActions'
import { formatCurrency } from '../../utils/formatNumber'

interface Props {
  onContinuePress?: () => void,
  onEditPress?: () => void,
  address: string,
  amount: number,
  symbol: string,
  comment?: string,
  fee: number,
}

function SendStep2({ onContinuePress, onEditPress,
  address, amount, comment, fee, symbol }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Lottie source={require('../../../assets/bird4.json')}
        autoPlay loop style={styles.logoImage}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Receiving address</Text>
      </View>
      <OutputWithActions style={styles.input1} text={address} frame copy tonScan/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Amount</Text>
      </View>
      <Input style={styles.input1} value={formatCurrency(amount, symbol)}
        editable={false} suffix={'+ ' + formatCurrency(fee, symbol)}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Comment</Text>
      </View>
      <Input style={styles.input1} value={comment}
        placeholder='Optional' editable={false}/>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1}
          onPress={onEditPress}>Edit</Button>
        <Button type='primary' style={styles.btn2}
          onPress={onContinuePress}>Confirm</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  labelContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: '#798795',
    fontSize: 13,
    fontWeight: '700',
  },
  input1: {
    marginTop: 6,
  },
  btnContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
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

export default SendStep2
