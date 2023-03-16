import React, { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { shortenString } from '../utils'
import Input from './Input'
import OutputWithActions from './OutputWithActions'
import { callApi } from '../api'

interface Props {
  style?: StyleProp<ViewStyle>,
  onAddWalletPress?: () => void
}

const gradientColors = ['#3F79CF','#2E74B5','#2160A1']
const gradientStart = {x: 1, y: 0}
const gradientEnd = {x: 0, y: 0}

function WalletSelector({ style, onAddWalletPress }: Props): JSX.Element {
  const [isSelectorOpen, setSelectorOpen] = useState(false)
  const [isEditNameOpen, setEditNameOpen] = useState(false)
  const [wallets, setWallets] = useState([{ name: 'Wallet1', address: 'EQ5VX7SD4KD98S3R1Q5VX7SD4KD98S3R1Q' }])
  const [name, setName] = useState('Personal Wallet')
  const [activeWallet, setActiveWallet] = useState(0)
  useEffect(() => {
    const getData = async () => {
      const n = await callApi('getItem', 'name')
      setName(n)
    }
    getData()
  }, [])
  const onEditPress = () => {
    setEditNameOpen(true)
    setSelectorOpen(false)
  }
  const onAddPress = () => {
    setSelectorOpen(false)
    onAddWalletPress && onAddWalletPress()
    // setWallets([...wallets, { name: 'Wallet' + (wallets.length + 1), address: 'EQ5VX7SD4KD98S3R1Q5VX7SD4KD98S3R1Q' }])
  }
  const onDonePress = async () => {
    setEditNameOpen(false)
    await callApi('setItem', 'name', name)
  }
  return (
    <View style={[styles.outerContainer, style]}>
      <LinearGradient colors={gradientColors} start={gradientStart} end={gradientEnd} style={styles.walletContainer}>
        <Image source={require('../../assets/logo2.png')} style={styles.backgroundImage} />
        <View style={styles.nameContainer}>
          {!isEditNameOpen && <TouchableOpacity style={styles.btn1} onPress={() => setSelectorOpen(true)}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Image source={require('../../assets/arrowDown.png')} style={styles.arrowDown} />
          </TouchableOpacity>}
          {isEditNameOpen && <Input walletNameInput onDonePress={onDonePress} value={name} onChangeText={setName}/>}
        </View>
        <Text style={styles.balance}>$18,025<Text style={styles.cents}>.26</Text></Text>
        <OutputWithActions text='EQ5VX7SD4KD98S3R1Q5VX7SD4KD98S3R1Q' trim style={styles.address} copy tonScan/>
      </LinearGradient>
      <Modal transparent visible={isSelectorOpen}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.touchableBackground} onPress={() => setSelectorOpen(false)}/>
          <View style={styles.selectorContainer}>
            {wallets.map((wallet, index) => <View key={index} style={styles.selectorElemContainer1}>
              <View style={[styles.selectorElemContainer2, index === activeWallet && styles.selectorElemContainer2Active]}>
                <TouchableOpacity style={styles.selectorElemContainer3} onPress={() => setActiveWallet(index)}>
                  <LinearGradient colors={gradientColors} start={gradientStart} end={gradientEnd}
                    style={[styles.selectorWalletGrad, index === activeWallet && styles.selectorWalletGradActive]}>
                    <View style={styles.selectorNameContainer}>
                      <Text style={styles.selectorName} numberOfLines={1}>{wallet.name}</Text>
                      {index === activeWallet && <TouchableOpacity onPress={onEditPress}>
                        <Image source={require('../../assets/edit.png')} style={styles.editIcon}/>
                      </TouchableOpacity>}
                    </View>
                    <Text style={styles.selectorWalletAddress}>{shortenString(wallet.address, 4)}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>)}
            <View style={styles.selectorElemContainer1}>
              <View style={styles.selectorElemContainer2}>
                <TouchableOpacity style={styles.selectorElemContainer3} onPress={onAddPress}>
                  <View style={styles.newWalletBtn}>
                    <View style={styles.selectorNameContainer}>
                      <Text style={styles.addWalletText}>Add Wallet</Text>
                    </View>
                    <Image source={require('../../assets/plus.png')} style={styles.plusIcon}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: 240,
  },
  walletContainer: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 220,
    width: 200,
    objectFit: 'fill',
  },
  nameContainer: {
    marginTop: 20,
    height: 40,
  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    flexShrink: 1,
  },
  arrowDown: {
    marginLeft: 4,
    width: 7,
    height: 3,
  },
  balance: {
    marginTop: 18,
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cents: {
    fontSize: 19,
    opacity: 0.6,
  },
  address: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
  },
  touchableBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  selectorContainer: {
    position: 'absolute',
    top: 105,
    left: 22,
    right: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minHeight: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 4,
  },
  selectorElemContainer1: {
    width: '33.333%',
    height: 70,
    padding: 4,
  },
  selectorElemContainer2: {
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0)',
    flex: 1,
    borderRadius: 10,
  },
  selectorElemContainer2Active: {
    borderColor: 'rgb(58,132,195)',
  },
  selectorElemContainer3: {
    flex: 1,
  },
  selectorWalletGrad: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 6,
  },
  selectorWalletGradActive: {
    borderColor: '#FFFFFF',
  },
  newWalletBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: 8,
    backgroundColor: '#EFF2F6',
    paddingLeft: 8,
    paddingRight: 6,
  },
  selectorNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    alignItems: 'flex-end',
  },
  selectorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  selectorWalletAddress: {
    marginTop: 'auto',
    marginBottom: 8,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.6,
  },
  addWalletText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#53657B',
    flexShrink: 1,
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginTop: 'auto',
    marginBottom: 8,
  },
})

export default WalletSelector
