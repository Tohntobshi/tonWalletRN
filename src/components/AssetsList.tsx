import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native'
import { selectCurrentAccountTokens, useAppSelector } from '../redux'
import { calcChangeValue } from '../utils/calcChangeValue'
import { formatCurrency } from '../utils/formatNumber'
import { round } from '../utils/round'


interface Props {
  style?: StyleProp<ViewStyle>,
}

const images: any = {
  toncoin: require('../../assets/ton.png'),
  bitcoin: require('../../assets/btc.png'),
  etherium: require('../../assets/eth.png'),
}


function AssetsList({ style }: Props): JSX.Element {
  const tokens = useAppSelector(selectCurrentAccountTokens)
  return (
    <View style={[styles.container, style]}>
      <ScrollView>
        {!!tokens && tokens.map(({ amount, slug, change24h, name, price, symbol, image }, index) => {
          const up = change24h >= 0
          const value = amount * price
          const changeValue = Math.abs(round(calcChangeValue(value, change24h), 4))
          const changePercent = Math.abs(round(change24h * 100, 2))
          const imgSrc = images[slug] ? images[slug] : { src: ''}
          return <React.Fragment key={slug}>
            <TouchableHighlight  style={styles.itemContainer1} activeOpacity={0.6} underlayColor="#EEEEEE" onPress={() => {}}>
              <View style={styles.itemContainer2}>
                <Image source={imgSrc} style={styles.assetImg}/>
                <View style={styles.infoContainer}>
                  <View style={styles.row1}>
                    <View style={styles.row3}>
                      <Text style={styles.name}>{name}</Text>
                      {/* {<Text style={styles.apy}>APY {apy}%</Text>} */}
                    </View>
                    <View style={styles.row3}>
                      <Text style={styles.valueUSD}>{formatCurrency(value, '$')}</Text>
                    </View>
                  </View>
                  <View style={styles.row2}>
                    <View style={styles.row3}>
                      <Text style={styles.value}>{formatCurrency(amount, symbol)} • {formatCurrency(price, '$')}</Text>
                    </View>
                    <View style={styles.row3}>
                      <Image style={styles.arrowImg2}
                        source={up ? require('../../assets/greenArrowUp.png') : require('../../assets/redArrowDown.png')}/>
                      <Text style={[styles.value, up ? styles.green : styles.red]}>{changePercent}% • {formatCurrency(changeValue, '$')}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.arrowContainer}>
                  <Image source={require('../../assets/arrowRight2.png')} style={styles.arrowImg}/>
                </View>
              </View>
            </TouchableHighlight>
            {index + 1 !== tokens.length && <View style={styles.separator1}><View style={styles.separator2}/></View>}
          </React.Fragment>
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  itemContainer1: {
    
  },
  itemContainer2: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  assetImg: {
    width: 36,
    height: 36,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 16,
    marginLeft: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    alignSelf: 'flex-start',
  },
  arrowImg: {
    marginTop: 17.5,
    width: 16,
    height: 16,
  },
  name: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '600',
  },
  apy: {
    marginLeft: 3,
    padding: 3,
    backgroundColor: '#EAFBF1',
    borderRadius: 4,
    color: '#1EC160',
    fontSize: 10,
    fontWeight: '700',
  },
  value: {
    color: '#798795',
    fontSize: 12,
    fontWeight: '400',
  },
  green: {
    color: '#2CD36F',
  },
  red: {
    color: '#F35B5B',
  },
  arrowImg2: {
    width: 8,
    height: 12,
  },
  valueUSD: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '600',
  },
  separator1: {
    paddingLeft: 62,
    paddingRight: 32,
  },
  separator2: {
    height: 1,
    backgroundColor: 'rgba(132,146,171,0.3)',
  },
})

export default AssetsList
