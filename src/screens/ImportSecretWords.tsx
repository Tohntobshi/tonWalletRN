import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../components/Button'
import Input from '../components/Input'

interface Props {
  onContinuePress?: () => void,
}


function ImportSecretWords({ onContinuePress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            source={require('../../assets/bird3.png')}
            style={styles.logoImage} />
          <Text style={styles.title}>24 Secret Words</Text>
          <Text style={styles.text}>Please restore access to your non-hardware
            wallet by entering the 24 secret words you
            wrote down when creating the wallet.</Text>
          <View style={styles.wordsContainer}>
            {[0, 1].map((colIndex) => <View key={colIndex} style={[styles.column, !!colIndex && styles.secondCol]}>
              {Array.from({ length: 12 }).map((_, wordIndex) => {
                const absIndex = wordIndex + 12 * colIndex
                return <Input key={absIndex} prefix={`${(absIndex + 1)}`} style={styles.input}/>
              })}
            </View>)}
          </View>
          <Text style={styles.error}>Your mnemonic words are invalid.</Text>
        </ScrollView>
      </View>
      <Button type={'primary'} style={styles.btn} onPress={onContinuePress}>Continue</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    flexShrink: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
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
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  wordsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  column: {
    flex: 1,
  },
  secondCol: {
    marginLeft: 17,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
  },
  btn: {
    marginVertical: 16,
  },
})

export default ImportSecretWords
