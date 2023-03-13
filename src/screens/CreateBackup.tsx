import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../components/Button'
import Backup from './Backup'

interface Props {
  onCancelPress?: () => void,
  onContinuePress?: () => void,
}

function CreateBackup({ onCancelPress, onContinuePress }: Props): JSX.Element {
  const [isBackupOpen, setBackupOpen] = useState(false)
  return (
    <View style={styles.page}>
      <Image
        source={require('../../assets/bird3.png')}
        style={styles.logoImage}
        />
      <Text style={styles.title}>Create Backup</Text>
      <Text style={styles.text1}>This is a secure wallet and is only
        controlled by you.</Text>
      <Text style={styles.text1}>And with great power comes great
        responsibility.</Text>
      <Text style={styles.text1}>You need to manually back
        up secret keys in a case you forget your
        password or lose access to this device.</Text>
      <Button type={'primary'} style={styles.btn1} onPress={() => setBackupOpen(true)}>Back Up</Button>
      <Button type={'linkDanger'} style={styles.btn2}>Skip For Now</Button>
      {isBackupOpen && <Backup onClosePress={() => setBackupOpen(false)} onContinuePress={onContinuePress}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoImage: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 32,
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
    color: '#313D4F',
  },
  text1: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    color: '#53657B',
  },
  btn1: {
    marginTop: 'auto'
  },
  btn2: {
    marginVertical: 22,
  },
})

export default CreateBackup
