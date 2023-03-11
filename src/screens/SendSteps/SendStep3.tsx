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

interface Props {
  onContinuePress?: () => void,
  onBackPress?: () => void,
}

function SendStep3({ onContinuePress, onBackPress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Image
        source={require('../../../assets/bird5.png')}
        style={styles.logoImage} />
      <Input style={styles.input1} placeholder='Confirm operation with your password'/>
      <Text style={styles.error}>Wrong password, please try again.</Text>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1} onPress={onBackPress}>Back</Button>
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
    width: 160,
    height: 160,
  },
  input1: {
    marginTop: 20,
  },
  error: {
    marginTop: 16,
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
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

export default SendStep3
