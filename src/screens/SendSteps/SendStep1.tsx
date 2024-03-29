import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { selectCurrentAccountTokens, setCurrentTransferError,
  useAppDispatch, useAppSelector, validateSendRequest } from '../../redux'
import { formatCurrency } from '../../utils/formatNumber'

const TON_ADDRESS_REGEX = /^[-\w_]{48}$/i
const TON_RAW_ADDRESS_REGEX = /^0:[\da-h]{64}$/i
const COMMENT_MAX_SIZE_BYTES = 121

function trimStringByMaxBytes(str: string, maxBytes: number) {
  const decoder = new TextDecoder('utf-8');
  const encoded = new TextEncoder().encode(str);

  return decoder.decode(encoded.slice(0, maxBytes)).replace(/\uFFFD/g, '');
}

function getIsAddressValid(address?: string) {
  return address && (
    TON_ADDRESS_REGEX.test(address)
    || TON_RAW_ADDRESS_REGEX.test(address)
  )
}

function SendStep1(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.isCurrentTransferLoading)
  const error = useAppSelector(state => state.currentTransfer.error)
  const userTokens = useAppSelector(selectCurrentAccountTokens)
  const toncoin = userTokens?.find((el) => el.slug === 'toncoin')
  const balance = toncoin?.amount || 0
  const symbol = toncoin?.symbol || ''
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const onAnyChange = () => {
    if (error) dispatch(setCurrentTransferError())
  }
  const onAddressChange = (val: string) => {
    setAddressError('')
    setAddress(val)
    onAnyChange()
  }
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')
  const onAmountChange = (val: string) => {
    setAmountError('')
    setAmount(val)
    onAnyChange()
  }
  const [comment, setComment] = useState('')
  const onCommentChange = (val: string) => {
    setComment(val)
    onAnyChange()
  }
  const onSendPress = () => {
    if (!getIsAddressValid(address)) {
      setAddressError('Incorrect address')
      return
    }
    const amountToSend = parseFloat(amount)
    if (Number.isNaN(amountToSend)) {
      setAmountError('Incorrect amount')
      return
    }
    if (amountToSend >= balance) {
      setAmountError('Insuffient balance')
      return
    }
    const commentToSend = trimStringByMaxBytes(comment, COMMENT_MAX_SIZE_BYTES)
    dispatch(validateSendRequest({
      slug: 'toncoin',
      address,
      amount: amountToSend,
      comment: commentToSend,
    }))
  }
  return (
    <View style={styles.page}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Receiving address</Text>
        {!!addressError &&
          <Text style={[styles.label2, styles.errorLabel]}>{addressError}</Text>}
      </View>
      <Input style={styles.input1} placeholder='Wallet address or domain'
        pasteButton value={address} onChangeText={onAddressChange}
        editable={!isLoading}/>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Amount</Text>
        {amountError
          ? <Text style={[styles.label2, styles.errorLabel]}>{amountError}</Text>
          : <Text style={styles.label2}>Your balance: {formatCurrency(balance, symbol)}</Text>}
      </View>
      <Input style={styles.input1} amountInput
        placeholder='0' editable={!isLoading}
        value={amount} onChangeText={onAmountChange}/>
      <View style={styles.feeContainer}>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Comment</Text>
      </View>
      <Input style={styles.input1} placeholder='Optional'
        editable={!isLoading}
        value={comment} onChangeText={onCommentChange}/>
      <Button type='primary' style={styles.btn} onPress={onSendPress} 
        disabled={!!addressError || !!amountError || !!error || isLoading}>
        Send TON</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  labelContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: '#0088CC',
    fontSize: 13,
    fontWeight: '700',
  },
  label2: {
    color: '#0088CC',
    fontSize: 13,
    fontWeight: '600',
  },
  errorLabel: {
    color: '#F35B5B',
  },
  error: {
    marginTop: 16,
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  input1: {
    marginTop: 6,
  },
  feeContainer: {
    marginTop: 6,
    minHeight: 12,
  },
  btn: {
    marginTop: 'auto',
  },
})

export default SendStep1
