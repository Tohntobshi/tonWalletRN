import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Button from '../../components/Button'

interface Props {
  onCheckPress?: () => void,
  mnemonic: string[],
}

function Words({ onCheckPress, mnemonic }: Props): JSX.Element {
  const columns = [mnemonic.slice(0, 12), mnemonic.slice(12, 24)]
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Write down this words in the correct
        order and store in a secret place.</Text>
      <View style={styles.wordsContainer}>
        {columns.map((col, colIndex) => <View key={colIndex}
          style={[styles.column, !!colIndex && styles.secondCol]}>
          {col.map((word, wordIndex) => <Text key={wordIndex} style={styles.word}>
            <Text style={styles.number}>{wordIndex + 12 * colIndex + 1}.</Text> {word}</Text>)}
        </View>)}
      </View>
      <Button type='primary' style={styles.btn1} onPress={onCheckPress}>Let’s Check</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    color: '#53657B',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  wordsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  column: {
    alignItems: 'center',
  },
  secondCol: {
    marginLeft: 30,
  },
  word: {
    fontSize: 17,
    marginBottom: 8,
    color: '#0088CC',
    fontWeight: '700',
  },
  number: {
    color: '#798795',
    fontWeight: '400',
  },
  btn1: {
    marginTop: 'auto',
  },
})

export default Words
