import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';
import Input from '../components/Input';

interface Props {
  onCancelPress?: () => void,
  onContinuePress?: () => void,
}

function CreatePassword({ onCancelPress, onContinuePress }: Props): JSX.Element {
  return (
    <View style={styles.page} >
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            source={require('../../assets/bird2.png')}
            style={styles.logoImage}
            />
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.text1}>The wallet is ready.</Text>
          <Text style={styles.text2}>Create a password to protect it.</Text>
          <Input style={styles.input1}/>
          <Input style={styles.input2} error/>
          <Text style={styles.text3}>To protect your wallet as much as possible,
            use a password with at least 8 characters, one
            small letter, one capital letter, one digit and one
            special character.</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Button type={'secondary'} style={styles.btn1} onPress={onCancelPress}>Cancel</Button>
        <Button type={'primary'} style={styles.btn2} onPress={onContinuePress}>Continue</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollView: {
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
    fontWeight: '700',
    textAlign: 'center',
  },
  text2: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
  },
  text3: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 8,
    marginBottom: 30
  },
  input1: {
    marginTop: 32,
  },
  input2: {
    marginTop: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    flexShrink: 0,
  },
  btn1: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btn2: {
    flex: 1,
    marginLeft: 15,
    paddingHorizontal: 20,
  }
})

export default CreatePassword
