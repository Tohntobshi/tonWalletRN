import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

interface Props {
  onCreated?: () => void,
}

function Creating({ onCreated }: Props): JSX.Element {
  const [count, setCount] = useState(3)
  useEffect(() => {
    let innerCount = 3
    const interval = setInterval(() => {
      if (innerCount > 0) {
        innerCount--
        setCount(innerCount)
      }
      else {
        onCreated && onCreated()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <View style={styles.page}>
      <Lottie source={require('../../assets/bird1.json')}
        autoPlay loop style={styles.logoImage}/>
      <Text style={styles.title}>Creating Wallet...</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.text1}>On the count of three...</Text>
        <Text style={styles.text2}>{count}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
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
  timerContainer: {
    marginTop: 80,
    width: 230,
    height: 107,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0088CC',
  },
  text2: {
    marginTop: 23,
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0088CC',
  },
})

export default Creating
