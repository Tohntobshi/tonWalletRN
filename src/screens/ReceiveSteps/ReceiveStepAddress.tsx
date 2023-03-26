import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import OutputWithActions from '../../components/OutputWithActions'
import { setReceiveInvoiceModalOpen, setReceiveQRModalOpen,
  useAppDispatch } from '../../redux'

interface Props {
  address: string,
}

function ReceiveStepAddress({  address }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <View style={styles.page}>
      <Text style={styles.text}>You can share this address, show QR-code
        or create invoice to receive TON</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Your address</Text>
      </View>
      <OutputWithActions style={styles.input1} text={address} frame copy tonScan/>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1}
          onPress={() => dispatch(setReceiveQRModalOpen(true))}>
          <Image source={require('../../../assets/qr.png')} style={styles.qrImg}/>
        </Button>
        <Button type='secondary' style={styles.btn2}
          onPress={() => dispatch(setReceiveInvoiceModalOpen(true))}>
          Create Invoice</Button>
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
    marginTop: 16,
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
