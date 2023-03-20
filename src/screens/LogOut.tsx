import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import ModalRegular from '../components/ModalRegular'
import { useAppDispatch, logOut } from '../redux'

interface Props {
  onCancelPress?: () => void,
  onExitPress?: () => void,
}


function LogOut({ onCancelPress, onExitPress }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const [all, setAll] = useState(false)
  const onAllChangePress = () => setAll(!all)
  const _onExitPress = () => {
    dispatch(logOut(all))
    onExitPress && onExitPress()
  }
  return (
    <ModalRegular
      title='Log Out'
      visible={true}
      onRequestClose={onCancelPress}>
      <Text style={styles.text}>This will disconnect the wallet from this 
        app. You will be able to restore your wallet 
        using 24 secret words - or import another 
        wallet.</Text>
      <TouchableOpacity style={styles.checkContainer} onPress={onAllChangePress}>
        <Checkbox value={all} onPress={onAllChangePress}/>
        <Text style={styles.text2}>Log out of all wallets</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Warning! You have not backed up this 
        wallet. If you log out, you will lose access 
        to your tokens and NFTs.</Text>
      <View style={styles.btnContainer}>
        <Button type='secondary' style={styles.btn1} onPress={onCancelPress}>Cancel</Button>
        <Button type='danger' style={styles.btn2} onPress={_onExitPress}>Exit</Button>
      </View>
    </ModalRegular>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 8,
    color: '#53657B',
  },
  checkContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text2: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 12,
    color: '#53657B',
  },
  btnContainer: {
    marginTop: 24,
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

export default LogOut
