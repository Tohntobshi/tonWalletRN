import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import OutputWithActions from '../../components/OutputWithActions'

interface Props {
  onQRPress?: () => void,
  onInvoicePress?: () => void,
}

function ReceiveStepAddress({ onQRPress, onInvoicePress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>You can share this address, show QR-code
        or create invoice to receive TON</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Your address</Text>
      </View>
      <OutputWithActions style={styles.input1} text='EQDAFX3J4Kl-5gZiBB8GpNB81ngLGlem3BrXVQ8-klfDcZhk' frame copy tonScan/>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1} onPress={onQRPress}>
          <Image source={require('../../../assets/qr.png')} style={styles.qrImg}/>
        </Button>
        <Button type='secondary' style={styles.btn2} onPress={onInvoicePress}>Create Invoice</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
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
  label: {
    color: '#798795',
    fontSize: 13,
    fontWeight: '700',
  },
  input1: {
    marginTop: 6,
  },
  btnContainer: {
    marginTop: 24,
    flexDirection: 'row',
  },
  qrImg: {
    width: 17,
    height: 17,
  },
  btn1: {
    paddingHorizontal: 14,
  },
  btn2: {
    marginLeft: 15,
    paddingHorizontal: 27,
  },
})

export default ReceiveStepAddress
