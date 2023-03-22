import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { mainSlice } from './reducers'
import rootSaga from './sagas'

const persistConfig = {
    key: 'main',
    storage: AsyncStorage,
    whitelist: [
        'currentAccountId',
        'accounts',
        'tokenInfoBySlug',
        'transactionsByAccountId'
    ]
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: persistReducer(persistConfig, mainSlice.reducer) as unknown as typeof mainSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
})

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
