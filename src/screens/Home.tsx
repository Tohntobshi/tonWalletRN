import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import ActionButton from '../components/ActionButton'
import MainTabs from '../components/MainTabs'
import Menu from '../components/Menu'
import Send from './Send'
import BackupRequest from './BackupRequest'
import Receive from './Receive'
import WalletSelector from '../components/WalletSelector'
import AddWallet from './AddWallet'
import LogOut from './LogOut'
import AssetsList from '../components/AssetsList'
import ActivityList from '../components/ActivityList'
import { useAppSelector, useAppDispatch, isBackedUpSelector } from '../redux'


const tabs = ['Assets', 'Activity', 'NFT']

function Home(): JSX.Element {
  const dispatch = useAppDispatch()
  const isBackedUp = useAppSelector(isBackedUpSelector)
  const [tab, setTab] = useState(0)
  const [isSendOpen, setSendOpen] = useState(false)
  const [isBackupOpen, setBackupOpen] = useState(false)
  const [isReceiveOpen, setReceiveOpen] = useState(false)
  const [isAddWalletOpen, setAddWalletOpen] = useState(false)
  const [isLogOutOpen, setLogOutOpen] = useState(false)
  return (
    <View style={styles.page}>
      <View style={styles.contentContainer}>
        {!isBackedUp && <TouchableOpacity style={styles.warningContainer} onPress={() => setBackupOpen(true)}>
          <Text style={styles.warningText1}>Wallet is not backed up</Text>
          <Text style={styles.warningText2}>Back up wallet to have full access to it</Text>
        </TouchableOpacity>}
        
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
          <ActionButton label='Swap' 
            source={require('../../assets/swap.png')} 
            style={styles.actionBtn2} onPress={() => {}}/>
          <ActionButton label='Earn' 
            source={require('../../assets/earn.png')} 
            style={styles.actionBtn2} onPress={() => {}}/>
        </View>
        <View style={styles.listsContainer}>
          <MainTabs labels={tabs} onChange={setTab} value={tab}/>
          {tab === 0 && <AssetsList style={styles.listContainer}/>}
          {tab === 1 && <ActivityList style={styles.listContainer}/>}
        </View>
      </View>
      
      {isSendOpen && <Send onCancelPress={() => setSendOpen(false)}/>}
      {isBackupOpen && <BackupRequest
        onClosePress={() => setBackupOpen(false)}
        onSuccess={() => setBackupOpen(false)}/>}
      {isReceiveOpen && <Receive onCancelPress={() => setReceiveOpen(false)}/>}
      {isAddWalletOpen && <AddWallet onCancelPress={() => setAddWalletOpen(false)}/>}
      {isLogOutOpen && <LogOut onCancelPress={() => setLogOutOpen(false)} onExitPress={() => setLogOutOpen(false)}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  warningContainer: {
    padding: 12,
    backgroundColor: 'rgba(243, 91, 91, 0.9)',
    width: '100%',
    borderRadius: 16,
  },
  warningText1: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  warningText2: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.7,
  },
  searchContainer: {
    marginTop: 12,
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
  listContainer: {
    flex: 1,
  },
})

export default Home
