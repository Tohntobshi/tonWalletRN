import 'text-encoding-polyfill'
import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Start from './screens/Start'
import Creating from './screens/Creating'
import CreatePassword from './screens/CreatePassword'
import CreateBackup from './screens/CreateBackup'
import ImportSecretWords from './screens/ImportSecretWords'
import Home from './screens/Home'
import { AuthState, persistor, store, useAppSelector } from './redux'

function MainScreen(): JSX.Element {
  const authState = useAppSelector(state => state.authState)
  const currentAccountId = useAppSelector(state => state.currentAccountId)
  return ( 
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={styles.mainContainer.backgroundColor}
      />
      <View style={styles.container}>
        {authState === AuthState.none && !currentAccountId && <Start />}
        {authState === AuthState.none && currentAccountId && <Home />}
        {authState === AuthState.creatingWallet && <Creating />}
        {authState === AuthState.createPassword || authState === AuthState.importWalletCreatePassword
          && <CreatePassword />}
        {authState === AuthState.createBackup && <CreateBackup />}
        {authState === AuthState.importWallet && <ImportSecretWords />}
      </View>
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
