import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../components/Button'

import ModalRegular from '../components/ModalRegular'

interface Props {
  onCancelPress?: () => void,
  onContinuePress?: () => void,
}


function InsecurePassword({ onCancelPress, onContinuePress }: Props): JSX.Element {
  return (
    <ModalRegular
      title='Insecure Password'
      visible={true}
      onRequestClose={onCancelPress}>
      <Text style={styles.text}>Your have entered an insecure password,
        which can be easily guessed by scammers.</Text>
      <Text style={styles.text}>Continue or change password to something more secure?</Text>
      <View style={styles.btnContainer}>
        <Button type='primary' style={styles.btn1} onPress={onCancelPress}>Change</Button>
        <Button type='danger' style={styles.btn2} onPress={onContinuePress}>Continue</Button>
      </View>
    </ModalRegular>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 8,
    color: '#53657B',
  },
  btnContainer: {
    marginTop: 24,
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

export default InsecurePassword
