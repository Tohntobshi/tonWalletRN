import React, { useMemo, useRef, useState } from 'react'
import {
  Animated,
  GestureResponderEvent,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Input from './Input'
import OutputWithActions from './OutputWithActions'
import { shortenString } from '../utils'
import { selectCurrentAccount, useAppSelector, setAccountTitle,
  useAppDispatch, switchAccount, selectCurrentAccountTokens} from '../redux'
import { buildWalletSelectorValues } from '../utils/buildWalletSelectorValues'

interface Props {
  style?: StyleProp<ViewStyle>,
  onAddWalletPress?: () => void
}

function WalletSelector({ style, onAddWalletPress }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const userTokens = useAppSelector(selectCurrentAccountTokens)
  const valuesToShow = buildWalletSelectorValues(userTokens || [])
  const currentAccountId = useAppSelector(state => state.currentAccountId)
  const currentAccount = useAppSelector(selectCurrentAccount)
  const accounts = useAppSelector(state => state.accounts)
  const [isSelectorOpen, setSelectorOpen] = useState(false)
  const [selectorPosition, setSelectorPosition] = useState(0)
  const [isEditNameOpen, setEditNameOpen] = useState(false)
  const animState = useRef(new Animated.Value(0)).current
  const animate = (open: boolean) => {
    Animated.timing(animState, {
      toValue: open ? 1 : 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      if (!open) setSelectorOpen(false)
    })
  }
  const openSelector = (e: GestureResponderEvent) => {
    setSelectorPosition(e.nativeEvent.pageY + 30)
    setSelectorOpen(true)
    animate(true)
  }
  const closeSelector = () => {
    animate(false)
  }
  const onEditPress = () => {
    setEditNameOpen(true)
    closeSelector()
  }
  const onAddPress = () => {
    closeSelector()
    onAddWalletPress && onAddWalletPress()
  }
  const onDonePress = () => {
    setEditNameOpen(false)
  }
  const onTitleChange = (val: string) => {
    dispatch(setAccountTitle({ id: currentAccountId || '', title: val }))
  }
  const setActiveWallet = (accId: string) => {
    dispatch(switchAccount(accId))
  }
  const accountsArr = useMemo(() => {
    return Object.keys(accounts).map(accId => ({ ...accounts[accId], accId }))
  }, [accounts])
  return (
    <View style={[styles.outerContainer, style]}>
      <ImageBackground source={require('../../assets/card-big.jpg')}
        resizeMode='cover' style={styles.walletContainer}
        imageStyle={styles.backgroundImage}>
        <View style={styles.nameContainer}>
          {!isEditNameOpen && <TouchableOpacity style={styles.btn1}
            onPress={openSelector}>
            <Text style={styles.name} numberOfLines={1}>
              {currentAccount?.title}</Text>
            <Image source={require('../../assets/arrowDown.png')}
              style={styles.arrowDown} />
          </TouchableOpacity>}
          {isEditNameOpen && <Input walletNameInput
            onDonePress={onDonePress} value={currentAccount?.title}
            onChangeText={onTitleChange}/>}
        </View>
        <Text style={styles.balance}>${valuesToShow.primaryWholePart}
          {!!valuesToShow.primaryFractionPart &&
            <Text style={styles.cents}>.{valuesToShow.primaryFractionPart}</Text>}
        </Text>
        <OutputWithActions text={currentAccount?.address || ''}
          trim style={styles.address} copy tonScan/>
      </ImageBackground>
      <Modal transparent visible={isSelectorOpen}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.touchableBackground}
            onPress={closeSelector}/>
          <Animated.View style={[styles.selectorContainer, {
              top: selectorPosition,
              translateY: Animated.multiply(Animated.add(animState, -1), 20),
              opacity: animState
            }]}>
            {accountsArr.map(({ accId, address, title }) => {
              const isActive = currentAccountId === accId
              return <View key={accId} style={styles.selectorElemContainer1}>
                <View style={[styles.selectorElemContainer2,
                  isActive && styles.selectorElemContainer2Active]}>
                  <TouchableOpacity style={styles.selectorElemContainer3}
                    disabled={isActive}
                    onPress={() => setActiveWallet(accId)}>
                    <ImageBackground resizeMode='cover'
                      source={require('../../assets/card.jpg')}
                      imageStyle={styles.selectorWalletImage}
                      style={[styles.selectorWallet,
                        isActive && styles.selectorWalletGradActive]}>
                      <View style={styles.selectorNameContainer}>
                        <Text style={styles.selectorName}
                          numberOfLines={1}>{title}</Text>
                        {isActive && <TouchableOpacity onPress={onEditPress}>
                          <Image source={require('../../assets/edit.png')}
                            style={styles.editIcon}/>
                        </TouchableOpacity>}
                      </View>
                      <Text style={styles.selectorWalletAddress}>
                        {shortenString(address, 4)}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            })}
            <View style={styles.selectorElemContainer1}>
              <View style={styles.selectorElemContainer2}>
                <TouchableOpacity style={styles.selectorElemContainer3}
                  onPress={onAddPress}>
                  <View style={styles.newWalletBtn}>
                    <View style={styles.selectorNameContainer}>
                      <Text style={styles.addWalletText}>Add Wallet</Text>
                    </View>
                    <Image source={require('../../assets/plus.png')}
                      style={styles.plusIcon}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
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
    paddingHorizontal: 16,
  },
  backgroundImage: {
    borderRadius: 16,
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
  },
  selectorContainer: {
    position: 'absolute',
    left: 22,
    right: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minHeight: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 4,
    elevation: 20,
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
  selectorWallet: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0)',
    paddingLeft: 8,
    paddingRight: 6,
    borderRadius: 8,
  },
  selectorWalletImage: {
    borderRadius: 8,
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
