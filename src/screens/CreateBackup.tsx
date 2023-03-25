import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

import { resetAuth, setBackupAuthModalOpen, useAppDispatch } from '../redux'
import Button from '../components/Button'


function CreateBackup(): JSX.Element {
  const dispatch = useAppDispatch()
  const onSkipPress = () => dispatch(resetAuth())
  const onBackUpPress = () => dispatch(setBackupAuthModalOpen(true))

  return (
    <View style={styles.page}>
      <Lottie source={require('../../assets/bird3.json')}
        autoPlay loop style={styles.logoImage}/>
      <Text style={styles.title}>Create Backup</Text>
      <Text style={styles.text1}>This is a secure wallet and is only
        controlled by you.</Text>
      <Text style={styles.text1}>And with great power comes great
        responsibility.</Text>
      <Text style={styles.text1}>You need to manually back
        up secret keys in a case you forget your
        password or lose access to this device.</Text>
      <Button type={'primary'} style={styles.btn1}
        onPress={onBackUpPress}>Back Up</Button>
      <Button type={'linkDanger'} style={styles.btn2}
        onPress={onSkipPress}>Skip For Now</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 50,
  },
  logoImage: {
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
