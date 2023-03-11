import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'
import OutputWithActions from '../../components/OutputWithActions'

interface Props {
  onContinuePress?: () => void,
  onEditPress?: () => void,
}

function SendStep2({ onContinuePress, onEditPress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Image
        source={require('../../../assets/bird4.png')}
        style={styles.logoImage} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Receiving address</Text>
      </View>
      <OutputWithActions style={styles.input1} text='EQDAFX3J4Kl-5gZiBB8GpNB81ngLGlem3BrXVQ8-klfDcZhk' frame copy tonScan/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Amount</Text>
      </View>
      <Input style={styles.input1} value='123.123 TON' editable={false} suffix='+ 0.0123456 TON'/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Comment</Text>
      </View>
      <Input style={styles.input1} value='Hello world' editable={false}/>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1} onPress={onEditPress}>Edit</Button>
        <Button type='primary' style={styles.btn2} onPress={onContinuePress}>Confirm</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    minHeight: 500,
  },
  logoImage: {
    marginTop: 16,
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
