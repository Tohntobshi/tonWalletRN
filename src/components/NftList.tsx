import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
} from 'react-native'
import Lottie from 'lottie-react-native'


interface Props {
  style?: StyleProp<ViewStyle>,
}

function NftList({ style }: Props): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      <Lottie source={require('../../assets/bird2.json')}
        autoPlay loop style={styles.noDataImage}/>
      <Text style={styles.noDataText}>No NFTs yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 32,
  },
  noDataImage: {
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
