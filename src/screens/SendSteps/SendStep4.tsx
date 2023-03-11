import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Button from '../../components/Button'

interface Props {
  onClosePress?: () => void,
}

function SendStep4({ onClosePress }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <Image
        source={require('../../../assets/bird6.png')}
        style={styles.logoImage} />
      <View style={styles.container1}>
        <Text style={styles.text1}>$18,025.26</Text>
        <Image source={require('../../../assets/arrowRight.png')} style={styles.img1}/>
        <Text style={styles.text1}>$18,003.57</Text>
      </View>
      <Text style={styles.text2}>-10.<Text style={styles.text3}>15 TON</Text></Text>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.btn1}>
          <Text style={styles.btnText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnText}>Repeat</Text>
        </TouchableOpacity>
      </View>
      <Button type='primary' style={styles.btn} onPress={onClosePress}>Close</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    minHeight: 500,
  },
  logoImage: {
    marginTop: 16,
    width: 160,
    height: 160,
  },
  container1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text1: {
    color: '#53657B',
    fontSize: 15,
    fontWeight: '500',
  },
  img1: {
    width: 16,
    height: 16,
    marginHorizontal: 5,
  },
  text2: {
    marginTop: 20,
    color: '#313D4F',
    fontSize: 48,
    fontWeight: '600',
  },
  text3: {
    fontSize: 16,
    fontWeight: '700',
  },
  btnsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  btn1: {
    backgroundColor: '#E5E9F0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
  },
  btn2: {
    backgroundColor: '#E5E9F0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
  },
  btnText: {
    color: '#2D4C5C',
    fontSize: 17,
    fontWeight: '700',
  },
  btn: {
    marginTop: 'auto',
  },
})

export default SendStep4
