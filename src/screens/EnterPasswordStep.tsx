import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'

import Button from '../components/Button'
import Input from '../components/Input'

interface Props {
  onContinuePress?: () => void,
  onBackPress?: () => void,
  placeholder?: string,
  error?: string,
  value?: string,
  onChange?: (val: string) => void,
  isLoading?: boolean,
}

function EnterPasswordStep({ onContinuePress, onBackPress, placeholder,
  error, value, onChange, isLoading }: Props): JSX.Element {
  return (
    <View style={styles.page}>
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Lottie source={require('../../assets/bird5.json')}
            autoPlay loop style={styles.logoImage}/>
          <Input style={styles.input1} value={value} error={!!error}
            onChangeText={onChange} editable={!isLoading}
            placeholder={placeholder || 'Confirm operation with your password'}/>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1}
          disabled={isLoading}
          onPress={onBackPress}>Back</Button>
        <Button type='primary' style={styles.btn2}
          disabled={!!error || !value || isLoading}
          onPress={onContinuePress}>Confirm</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  scrollViewContainer: {
    width: '100%',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  logoImage: {
    width: 160,
    height: 160,
  },
  input1: {
    marginTop: 20,
  },
  error: {
    marginTop: 16,
    color: '#F35B5B',
    fontSize: 15,
    fontWeight: '600',
  },
  btnContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
  btn1: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btn2: {
    flex: 1,
    marginLeft: 15,
    paddingHorizontal: 20,
  },
})

export default EnterPasswordStep
