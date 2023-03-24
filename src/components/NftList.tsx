import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
} from 'react-native'
import { ANIMATED } from '../config'


interface Props {
  style?: StyleProp<ViewStyle>,
}

function NftList({ style }: Props): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      <Image source={ANIMATED
        ? require('../../assets/bird2.gif')
        : require('../../assets/bird2.png')}
        style={styles.noDataImage}/>
      <Text style={styles.noDataText}>No NFTs yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  noDataImage: {
    marginTop: 32,
    width: 128,
    height: 128,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: '700',
    color: '#313D4F',
  }
})

export default NftList
