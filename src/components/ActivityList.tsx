import React, { useEffect, useMemo, useState } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
  TouchableHighlight,
  ScrollView,
  SectionList,
} from 'react-native'
import { shortenString } from '../utils'


interface Props {
  style?: StyleProp<ViewStyle>,
}

const mockList = Array.from({ length: 100 }).map((_, index) => {
  index = 100 - index
  let day = Math.ceil(index/10).toString()
  day = day.length === 1 ? '0' + day : day
  const date = `2023-03-${day}T10:00:00`
  let comment = !(index % 7) ? 'Good morning! It’s very long first comment' : ''
  comment = [95, 94].includes(index) ? 'Short' : comment
  return { id: index, type: index % 2 ? 'sent' : 'received', address: '546Fadf49fm398urERet598fdjwErRTfSeFrtR567TUilk',
    value: '21', units: 'TON', date, comment }
})

const makeSections = (list: any[]) => {
  const sections = {}
  for (const el of list) {
    const date = el.date.slice(0,10) as string
    if ((sections as any )[date]) {
      (sections as any)[date].push(el)
    } else {
      (sections as any)[date] = [el]
    }
  }
  const dates = Object.keys(sections)
  dates.sort()
  dates.reverse()
  return dates.map(date => ({ title: date, data: (sections as any)[date]}))
}

const mockSections = makeSections(mockList)

const getMockData = async (offset: number) => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000))
  return mockList.slice(offset, offset + 10)
}

function ActivityList({ style }: Props): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([] as any[])
  const getData = async () => {
    if (loading) return
    setLoading(true)
    const data = await getMockData(list.length)
    setList([...list, ...data])
    setLoading(false)
  }
  const sections = useMemo(() => {
    return makeSections(list)
  }, [list])
  const onEndReached = () => {
    getData()
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <View style={style}>
      <SectionList sections={sections} stickySectionHeadersEnabled={false} onEndReached={onEndReached} onEndReachedThreshold={0.9}
        ListHeaderComponent={() => <View style={styles.header}/>}
        ItemSeparatorComponent={() => <View style={styles.separator1}><View style={styles.separator2}/></View>}
        renderSectionHeader={({section: {title}}) => <View style={styles.sectionHeaderContainer1}>
            <View style={styles.sectionHeaderContainer2}>
              <Text style={styles.sectionHeader}>{title}</Text>
            </View>
          </View>}
        renderItem={({ item }) => {
          const { id, type, value, units, date, address, comment } = item
          const isReceived = type === 'received'
          const isSent = type === 'sent'
          const imgSrc = isReceived ? require('../../assets/received.png') : require('../../assets/sent.png')
          return <TouchableHighlight key={id} style={styles.itemContainer1} activeOpacity={0.6} underlayColor="#EEEEEE" onPress={() => {}}>
            <View style={styles.itemContainer2}>
              <Image source={imgSrc} style={styles.typeImg}/>
              <View style={styles.infoContainer}>
                <View style={styles.row1}>
                  <View style={styles.row3}>
                    <Text style={styles.name}>{type}</Text>
                  </View>
                  <View style={styles.row3}>
                    <Text style={[styles.value, isReceived && styles.green]}>{isSent && '-'}{isReceived && '+'}{value} {units}</Text>
                  </View>
                </View>
                <View style={styles.row2}>
                  <View style={styles.row3}>
                    <Text style={styles.lowerText}>{date}</Text>
                  </View>
                  <View style={styles.row3}>
                    <Text style={styles.lowerText}>{shortenString(address)}</Text>
                  </View>
                </View>
                {!!comment && <View style={isReceived ? styles.receivedCommentContainer1 : styles.commentContainer1}>
                    <View style={[styles.commentContainer2, isReceived && styles.receivedCommentContainer]}>
                      <Text style={[styles.comment, isReceived && styles.green]} numberOfLines={1}>{comment}</Text>
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
})

export default ActivityList
