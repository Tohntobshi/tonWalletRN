import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import Button from '../components/Button'

interface Props {
  onCreatePress?: () => void,
  onImportPress?: () => void,
  onAboutPress?: () => void,
}

function Start({ onCreatePress, onImportPress, onAboutPress }: Props): JSX.Element {
  return (
    <View
      style={styles.page}
      >
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        />
      <Text style={styles.title}>MyTonWallet</Text>
      <Text style={styles.text}>MyTonWallet allows to securely store{'\n'}
        crypto and make blockchain payments at{'\n'}
        the speed of light.</Text>
      <Button type='primary' style={styles.createBtn} onPress={onCreatePress}>Create Wallet</Button>
      <Button type='link' style={styles.mnemonicLink} onPress={onImportPress}>Import From 24 Secret Words</Button>
      <Button type='linkSecondary' style={styles.aboutLink} onPress={onAboutPress}>About MyTonWallet</Button>
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
  },
  text: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
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
