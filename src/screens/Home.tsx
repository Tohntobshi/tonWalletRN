import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ActionButton from '../components/ActionButton'
import MainTabs from '../components/MainTabs'
import Menu from '../components/Menu'

interface Props {
  onExitPress?: () => void,
}

const tabs = ['Assets', 'Activity', 'NFT']

function Home({ onExitPress }: Props): JSX.Element {
  const [tab, setTab] = useState(0)
  return (
    <View style={styles.page} >
      <View style={styles.searchContainer}>
        <Menu  onExitPress={onExitPress} />
      </View>
      <LinearGradient colors={['#3F79CF','#2E74B5','#2160A1']} start={{x: 1, y: 0}} end={{x: 0, y: 0}} style={styles.walletContainer}/>
      <View style={styles.actionBtnsContainer}>
        <ActionButton label='Receive' source={require('../../assets/receive.png')} style={styles.actionBtn1}/>
        <ActionButton label='Send' source={require('../../assets/send.png')} style={styles.actionBtn2}/>
        <ActionButton label='Swap' source={require('../../assets/swap.png')} style={styles.actionBtn2}/>
        <ActionButton label='Earn' source={require('../../assets/earn.png')} style={styles.actionBtn2}/>
      </View>
      <View style={styles.listsContainer}>
        <MainTabs labels={tabs} onChange={setTab} value={tab}/>
      </View>
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
    height: 240,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
