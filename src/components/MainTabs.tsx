import React, { useState } from 'react'
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import ActivityList from './ActivityList'
import AssetsList from './AssetsList'
import NftList from './NftList'


const renderLabel = ({ route, focused }: any) => (
  <Text style={[styles.label, focused && styles.activeLabel]}>
    {route.title}
  </Text>
)
const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    renderLabel={renderLabel}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
  />
)

const First = () =>  <AssetsList style={styles.listContainer}/>
const Second = () =>  <ActivityList style={styles.listContainer}/>
const Third = () =>  <NftList style={styles.listContainer}/>
const renderScene = SceneMap({
  first: First,
  second: Second,
  third: Third
});
const routes = [
  { key: 'first', title: 'Assets' },
  { key: 'second', title: 'Activity' },
  { key: 'third', title: 'NFT' },
]


function MainTabs(): JSX.Element {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }
  return (
    <View style={styles.container} onLayout={onLayout}>
      <TabView
        renderTabBar={renderTabBar}
        style={styles.tabView}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderColor: 'rgba(132,146,171,0.3)',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  indicator: {
    backgroundColor: '#0088CC',
  },
  label: {
    color: '#313D4F',
    fontSize: 15,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#0088CC',
  },
  tabView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  listContainer: {
    flex: 1,
  },
})

export default MainTabs
