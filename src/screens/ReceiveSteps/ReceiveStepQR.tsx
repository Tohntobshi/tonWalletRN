import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import Button from '../../components/Button'
import { shortenString } from '../../utils'

interface Props {
  onBackPress?: () => void,
  address: string,
}

function ReceiveStepQR({ onBackPress, address }: Props): JSX.Element {
  const hint = shortenString(address)
  return (
    <View style={styles.page}>
      <View style={styles.qrContainer}>
        <QRCode size={200} 
          value={address}
          logo={require('../../../assets/logo.png')}
          logoBackgroundColor='#FFFFFF'
        />
      </View>
      <Text style={styles.hint}>{hint}</Text>
      <Button type='secondary' style={styles.btn}
        onPress={onBackPress}>Back</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
  },
  qrContainer: {
    marginTop: 21,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
  },
  hint: {
    marginTop: 12,
    color: '#53657B',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  btn: {
    marginTop: 24,
  },
})

export default ReceiveStepQR
