import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../components/Button'
import ModalBottom from '../components/ModalBottom'
import SafetyRules from './BackupSteps/SafetyRules'
import Words from './BackupSteps/Words'
import LetsCheck from './BackupSteps/LetsCheck'

interface Props {
  onCancelPress?: () => void,
  onContinuePress?: () => void,
}

const titles = {
  1: 'Safety Rules',
  2: '24 Words',
  3: 'Let’s Check!',
}

function CreateBackup({ onCancelPress, onContinuePress }: Props): JSX.Element {
  const [step, setStep] = useState(0)
  return (
    <View
      style={styles.page}
      >
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
      <Button type={'primary'} style={styles.btn1} onPress={() => setStep(1)}>Back Up</Button>
      <Button type={'linkDanger'} style={styles.btn2}>Skip For Now</Button>
      <ModalBottom
        title={(titles as any)[step]}
        visible={!!step}
        onRequestClose={() => setStep(0)}>
        {step === 1 && <SafetyRules onUnderstoodPress={() => setStep(2)}/>}
        {step === 2 && <Words onCheckPress={() => setStep(3)}/>}
        {step === 3 && <LetsCheck onContinuePress={onContinuePress} onBackPress={() => setStep(2)}/>}
      </ModalBottom>
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
  },
  text1: {
    marginTop: 32,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
  },
  btn1: {
    marginTop: 'auto'
  },
  btn2: {
    marginVertical: 22,
  },
})

export default CreateBackup
