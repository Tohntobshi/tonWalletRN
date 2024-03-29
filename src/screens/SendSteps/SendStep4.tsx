import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

import Button from '../../components/Button'
import { formatCurrency } from '../../utils/formatNumber'
import { selectCurrentAccountTokens, useAppSelector } from '../../redux'
import { bigStrToHuman } from '../../utils'

interface Props {
  onClosePress?: () => void,
}

function SendStep4({ onClosePress }: Props): JSX.Element {
  const userTokens = useAppSelector(selectCurrentAccountTokens)
  const toncoin = userTokens?.find((el) => el.slug === 'toncoin')
  const currentTransfer = useAppSelector(state => state.currentTransfer)
  const initialBalance = currentTransfer.initialBalance || 0
  const amount = currentTransfer.amount || 0
  const symbol = toncoin?.symbol || ''
  const fee = bigStrToHuman(currentTransfer.fee || '0', toncoin?.decimals)
  const price = toncoin?.price || 0
  const spent = formatCurrency(amount + fee, '').split('.')
  return (
    <View style={styles.page}>
      <Lottie source={require('../../../assets/bird6.json')}
        autoPlay loop style={styles.logoImage}/>
      <View style={styles.container1}>
        <Text style={styles.text1}>
          {formatCurrency(initialBalance * price, '$')}
        </Text>
        <Image source={require('../../../assets/arrowRight.png')}
          style={styles.img1}/>
        <Text style={styles.text1}>
          {formatCurrency((initialBalance - amount - fee) * price, '$')}
        </Text>
      </View>
      <Text style={styles.text2}>
        -{spent[0]}
        <Text style={styles.text3}>
          {!!spent[1] && '.' + spent[1]} {symbol}
        </Text>
      </Text>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.btn1}>
          <Text style={styles.btnText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnText}>Repeat</Text>
        </TouchableOpacity>
      </View>
      <Button type='primary' style={styles.btn}
        onPress={onClosePress}>Close</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 160,
    height: 160,
  },
  container1: {
    marginTop: 20,
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
