import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ActionButton from '../components/ActionButton'
import MainTabs from '../components/MainTabs'
import Menu from '../components/Menu'
import Send from './Send'
import Backup from './Backup'
import Receive from './Receive'
import WalletSelector from '../components/WalletSelector'
import AddWallet from './AddWallet'
import LogOut from './LogOut'

interface Props {
  onExitPress?: () => void,
}

const tabs = ['Assets', 'Activity', 'NFT']

function Home({ onExitPress }: Props): JSX.Element {
  const [tab, setTab] = useState(0)
  const [isSendOpen, setSendOpen] = useState(false)
  const [isBackupOpen, setBackupOpen] = useState(false)
  const [isReceiveOpen, setReceiveOpen] = useState(false)
  const [isAddWalletOpen, setAddWalletOpen] = useState(false)
  const [isLogOutOpen, setLogOutOpen] = useState(false)
  return (
    <View style={styles.page} >
      <View style={styles.searchContainer}>
        <Menu onExitPress={() => setLogOutOpen(true)} onBackupPress={() => setBackupOpen(true)}/>
      </View>
      <WalletSelector style={styles.walletContainer} onAddWalletPress={() => setAddWalletOpen(true)}/>
      <View style={styles.actionBtnsContainer}>
        <ActionButton label='Receive'
          source={require('../../assets/receive.png')}
          style={styles.actionBtn1}
          onPress={() => setReceiveOpen(true)}/>
        <ActionButton label='Send'
          source={require('../../assets/send.png')}
          style={styles.actionBtn2}
          onPress={() => setSendOpen(true)}/>
        <ActionButton label='Swap' source={require('../../assets/swap.png')} style={styles.actionBtn2}/>
        <ActionButton label='Earn' source={require('../../assets/earn.png')} style={styles.actionBtn2}/>
      </View>
      <View style={styles.listsContainer}>
        <MainTabs labels={tabs} onChange={setTab} value={tab}/>
      </View>
      {isSendOpen && <Send onCancelPress={() => setSendOpen(false)}/>}
      {isBackupOpen && <Backup onClosePress={() => setBackupOpen(false)} onContinuePress={() => setBackupOpen(false)}/>}
      {isReceiveOpen && <Receive onCancelPress={() => setReceiveOpen(false)}/>}
      {isAddWalletOpen && <AddWallet onCancelPress={() => setAddWalletOpen(false)}/>}
      {isLogOutOpen && <LogOut onCancelPress={() => setLogOutOpen(false)} onExitPress={onExitPress}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  walletContainer: {
    marginTop: 16,
  },
  actionBtnsContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  actionBtn1: {
    flex: 1,
  },
  actionBtn2: {
    flex: 1,
    marginLeft: 8,
  },
  listsContainer: {
    marginTop: 12,
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
})

export default Home
