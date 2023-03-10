import React, { useState } from 'react'
import type {PropsWithChildren} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'


import Start from './screens/Start'
import Creating from './screens/Creating'
import CreatePassword from './screens/CreatePassword'
import CreateBackup from './screens/CreateBackup'
import ImportSecretWords from './screens/ImportSecretWords'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  const [screen, setScreen] = useState(0)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.mainContainer.backgroundColor}
      />
      <View style={{ flexGrow: 1 }}>
        {screen === 0 && <Start onCreatePress={() => setScreen(1)} onImportPress={() => setScreen(4)}/>}
        {screen === 1 && <Creating onCreated={() => setScreen(2)}/>}
        {screen === 2 && <CreatePassword onCancelPress={() => setScreen(0)} onContinuePress={() => setScreen(3)}/>}
        {screen === 3 && <CreateBackup />}
        {screen === 4 && <ImportSecretWords />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F5FA',
    flexGrow: 1
  },
})

export default App
