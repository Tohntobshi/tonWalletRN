import React, { useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
  TouchableHighlight,
  SectionList,
} from 'react-native'
import Lottie from 'lottie-react-native'
import { ApiTransaction } from '../api/types'
import { requestTransactions, selectCurrentTransactions,
  useAppDispatch, useAppSelector } from '../redux'
import { bigStrToHuman, shortenString } from '../utils'


interface Props {
  style?: StyleProp<ViewStyle>,
}

const makeSections = (list: ApiTransaction[]): { data: ApiTransaction[], title: string }[] => {
  const today = format(new Date, 'yyyy-MM-dd')
  const sections: Record<string, ApiTransaction[]> = {}
  for (const el of list) {
    const date = format(el.timestamp, 'yyyy-MM-dd')
    if (sections[date]) {
      sections[date].push(el)
    } else {
      sections[date] = [el]
    }
  }

  const dates = Object.keys(sections)
  dates.sort()
  dates.reverse()
  return dates.map(date => ({
    title: today === date ? 'Today' : format(new Date(date + 'T00:00:00'), 'do LLLL'),
    data: sections[date]
  }))
}

function ActivityList({ style }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const currentAccountId = useAppSelector(state => state.currentAccountId)
  const transactions = useAppSelector(selectCurrentTransactions)
  const tokens = useAppSelector(state => state.tokenInfoBySlug)
  const isLoading = useAppSelector(state => state.isTransactionsLoading)

  const getData = (isRefresh: boolean) => {
    if (isLoading) return
    dispatch(requestTransactions({ isRefresh }))
  }
  const sections = useMemo(() => {
    return makeSections(transactions)
  }, [transactions])
  const onEndReached = () => getData(false)
  useEffect(() => {
    if (transactions.length < 10) getData(false)
  }, [currentAccountId])
  return (
    <View style={style}>
      <SectionList sections={sections} stickySectionHeadersEnabled={false}
        onEndReached={onEndReached} onEndReachedThreshold={0.9}
        onRefresh={() => getData(true)}
        refreshing={isLoading}
        ListHeaderComponent={() => <View style={styles.header}/>}
        ItemSeparatorComponent={() => <View style={styles.separator1}><View style={styles.separator2}/></View>}
        renderSectionHeader={({section: {title}}) => <View style={styles.sectionHeaderContainer1}>
            <View style={styles.sectionHeaderContainer2}>
              <Text style={styles.sectionHeader}>{title}</Text>
            </View>
          </View>}
        ListEmptyComponent={() => <View style={styles.noDataContainer}>
            <Lottie source={require('../../assets/bird8.json')}
              autoPlay loop style={styles.noDataImage}/>
            <Text style={styles.noDataText}>No Activity</Text>
          </View>}
        renderItem={({ item }) => {
          const { txId, amount, comment, isIncoming, type, timestamp, fromAddress, toAddress, slug } = item
          const tokenInfo = slug ? tokens[slug] : undefined
          const address = isIncoming ? fromAddress : toAddress
          const imgSrc = isIncoming ? require('../../assets/received.png') : require('../../assets/sent.png')
          return <TouchableHighlight key={txId} style={styles.itemContainer1}
            activeOpacity={0.6} underlayColor="#EEEEEE" onPress={() => {}}>
            <View style={styles.itemContainer2}>
              <Image source={imgSrc} style={styles.typeImg}/>
              <View style={styles.infoContainer}>
                <View style={styles.row1}>
                  <View style={styles.row3}>
                    <Text style={styles.name}>{type || (isIncoming ? 'Received' : 'Sent')}</Text>
                  </View>
                  <View style={styles.row3}>
                    <Text style={[styles.value, isIncoming && styles.green]}>
                      {isIncoming && '+'}{bigStrToHuman(amount, tokenInfo?.decimals)} {tokenInfo?.symbol}</Text>
                  </View>
                </View>
                <View style={styles.row2}>
                  <View style={styles.row3}>
                    <Text style={styles.lowerText}>{format(timestamp, 'HH:mm')}</Text>
                  </View>
                  <View style={styles.row3}>
                    <Text style={styles.lowerText}>{shortenString(address)}</Text>
                  </View>
                </View>
                {!!comment && <View style={isIncoming ? styles.receivedCommentContainer1 : styles.commentContainer1}>
                    <View style={[styles.commentContainer2, isIncoming && styles.receivedCommentContainer]}>
                      <Text style={[styles.comment, isIncoming && styles.green]} numberOfLines={1}>{comment}</Text>
                    </View>
                  </View>}
              </View>
              <View style={styles.arrowContainer}>
                <Image source={require('../../assets/arrowRight2.png')} style={styles.arrowImg}/>
              </View>
            </View>
          </TouchableHighlight>
        }}/>
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
  },
  typeImg: {
    marginTop: 16,
    width: 36,
    height: 36,
  },
  arrowImg: {
    marginTop: 17.5,
    width: 16,
    height: 16,
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
  name: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '600',
  },
  lowerText: {
    color: '#798795',
    fontSize: 12,
    fontWeight: '400',
  },
  green: {
    color: '#2CD36F',
  },
  value: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '600',
  },
  commentContainer1: {
    marginTop: 7,
    flexDirection: 'row-reverse',
  },
  receivedCommentContainer1: {
    marginTop: 7,
    flexDirection: 'row',
  },
  commentContainer2: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#EDF1F7',
    borderRadius: 15,
    borderTopRightRadius: 5,
  },
  receivedCommentContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 5,
    backgroundColor: '#EAFBF1',
  },
  comment: {
    fontSize: 13,
    fontWeight: '500',
    color: '#53657B',
  },
  sectionHeaderContainer1: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionHeaderContainer2: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#EDF1F7',
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#53657B',
  },
  separator1: {
    paddingLeft: 62,
    paddingRight: 32,
  },
  separator2: {
    height: 1,
    backgroundColor: 'rgba(132,146,171,0.3)',
  },
  header: {
    height: 8,
  },
  noDataContainer: {
    paddingTop: 24,
    alignItems: 'center',
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

export default ActivityList
