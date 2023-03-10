import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'

interface Props {
  onUnderstoodPress?: () => void,
}

function SafetyRules({ onUnderstoodPress }: Props): JSX.Element {
  const [first, setFirst] = useState(false)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  return (
    <View
      style={styles.page}
      >
      <Image
          source={require('../../../assets/bird4.png')}
          style={styles.logoImage} />
      <View style={styles.textContainer}>
        <Checkbox value={first} style={styles.checkbox} onPress={() => setFirst(!first)}/>
        <Text style={styles.text}>On the next screen you will see the secret
          words. Write them down in the correct
          order and store in a secure place.</Text>
      </View>
      <View style={styles.textContainer}>
        <Checkbox value={second} style={styles.checkbox} onPress={() => setSecond(!second)}/>
        <Text style={styles.text}>They allow to open your wallet if you lose
          your password or access to this device.</Text>
      </View>
      <View style={styles.textContainer}>
        <Checkbox value={third} style={styles.checkbox} onPress={() => setThird(!third)}/>
        <Text style={styles.text}>If anybody else sees these words your funds
          may be stolen.</Text>
      </View>
      <Button type={'primary'} style={styles.btn1} onPress={onUnderstoodPress}>Understood</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    minHeight: 500,
  },
  logoImage: {
    marginTop: 24,
    width: 100,
    height: 100,
  },
  textContainer: {
    marginTop: 24,
    flexDirection: 'row',
  },
  checkbox: {
    marginTop: 3,
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    flex: 1,
    marginLeft: 12,
    color: '#53657B',
  },
  btn1: {
    marginTop: 'auto'
  },
  
})

export default SafetyRules
