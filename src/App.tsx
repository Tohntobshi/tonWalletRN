import 'text-encoding-polyfill'
import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Start from './screens/Start'
import Creating from './screens/Creating'
import CreatePassword from './screens/CreatePassword'
import CreateBackup from './screens/CreateBackup'
import ImportSecretWords from './screens/ImportSecretWords'
import Home from './screens/Home'
import Transitioner from './components/Transitioner'
import { persistor, store, useAppSelector } from './redux'
import { AuthState } from './types'

function MainScreen(): JSX.Element {
  const authState = useAppSelector(state => state.auth.authState)
  const currentAccountId = useAppSelector(state => state.currentAccountId)
  const getActiveScreen = () => {
    if (authState === AuthState.none && !currentAccountId) return 0
    if (authState === AuthState.importWallet) return 1
    if (authState === AuthState.creatingWallet) return 2
    if (authState === AuthState.createPassword) return 3
    if (authState === AuthState.createBackup) return 4
    if (authState === AuthState.none && currentAccountId) return 5
    return 0
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={styles.mainContainer.backgroundColor}
      />
      <Transitioner
        style={styles.container}
        elements={[
          <Start />,
          <ImportSecretWords />,
          <Creating />,
          <CreatePassword />,
          <CreateBackup />,
          <Home />,
        ]}
        active={getActiveScreen()}
      />
    </SafeAreaView>
  )
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  
        <MainScreen />
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F5FA',
    flexGrow: 1,
  },
  container: { 
    flexGrow: 1,
  },
})

export default App
