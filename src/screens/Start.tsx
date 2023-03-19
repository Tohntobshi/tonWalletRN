import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button'
import { startCreatingWallet, useAppDispatch } from '../redux';


function Start(): JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <View style={styles.page}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}/>
      <Text style={styles.title}>MyTonWallet</Text>
      <Text style={styles.text}>MyTonWallet allows to securely store{'\n'}
        crypto and make blockchain payments at{'\n'}
        the speed of light.</Text>
      <Button type='primary' style={styles.createBtn} onPress={() => dispatch(startCreatingWallet())}>Create Wallet</Button>
      <Button type='link' style={styles.mnemonicLink} onPress={() => {}}>Import From 24 Secret Words</Button>
      <Button type='linkSecondary' style={styles.aboutLink}>About MyTonWallet</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
  },
  logoImage: {
    marginTop: 80,
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 32,
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
    color: '#313D4F',
  },
  text: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#53657B',
  },
  createBtn: {
    marginTop: 'auto',
  },
  mnemonicLink: {
    marginTop: 22,
  },
  aboutLink: {
    marginTop: 37,
    marginBottom: 24,
  },
})

export default Start
