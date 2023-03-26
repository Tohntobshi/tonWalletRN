import { REHYDRATE } from 'redux-persist'
import { Alert } from 'react-native'
import { call, put, takeLatest, all, delay, select, takeEvery } from 'redux-saga/effects'
import { addNextWallet, completeBackup, createWallet, finishPasswordCreation,
    gracefulyCloseRequestBackupModal,
    importWallet, logOut, requestMnemonic, startCreatingWallet, switchAccount
} from '../asyncActions'
import { callApi } from '../../api'
import { setAuthState, setAuthMnemonic, setAuthMnemonicError,
    setAuthPassword, setAuthIsImported, addAccount, resetAuth,
    resetBackupRequred, removeAllAccounts, setAuthPasswordError,
    setCurrentAccountId, removeAccount, setIsAuthLoading, setAddWalletModalOpen,
    setBackupAuthModalOpen, setBackupRequestModalOpen } from '../reducers'
import { MethodResponseUnwrapped } from '../../api/methods/types'
import { AuthState } from '../../types'
import { RootState } from '../types'
import { CURRENT_NETWORK } from '../../config'
import { selectCurrentTransactions } from '../selectors'
import { ApiTransaction } from '../../api/types'
import { getIsTxIdLocal } from '../../utils'


function* startCreatingWalletSaga() {
    // generate mnemonic and if password exists proceed to create wallet step
    // if no password (first wallet) send to password create step
    yield put(setAuthState(AuthState.creatingWallet))
    const [mnemonic, _]: [MethodResponseUnwrapped<'generateMnemonic'>, any] = 
        yield all([call(callApi, 'generateMnemonic'), delay(3000)])
    yield put(setAuthMnemonic(mnemonic))
    const { auth: { password } }: RootState = yield select()
    if (password) {
        yield put(createWallet())
    } else {
        yield put(setAuthState(AuthState.createPassword))
    }
}

function* importWalletSaga({ payload }: ReturnType<typeof importWallet>) {
    // verify mnemonic and check password presence and send to create wallet
    // or send to password create if no tmp password (first wallet)
    const { isAuthLoading }: RootState = yield select()
    if (isAuthLoading) return
    yield put(setIsAuthLoading(true))
    const mnemonic = payload.map(el => el.toLowerCase().trim())
    const isValid: MethodResponseUnwrapped<'validateMnemonic'> =
        yield call(callApi, 'validateMnemonic', mnemonic)
    if (!isValid) {
        yield put(setAuthMnemonicError('Your mnemonic words are invalid.'))
        yield put(setIsAuthLoading(false))
        return
    }
    yield put(setAuthIsImported(true))
    yield put(setAuthMnemonic(mnemonic))
    yield put(setIsAuthLoading(false))
    const { auth: { password } }: RootState = yield select()
    if (password) {
        yield put(createWallet())
    } else {
        yield put(setAuthState(AuthState.createPassword))
    }
}

function* finishPasswordCreationSaga({ payload }: ReturnType<typeof finishPasswordCreation>) {
    yield put(setAuthPassword(payload))
    yield put(createWallet())
}

function* createWalletSaga() {
    // take password and mnenomic, create wallet
    // if mnemonic is not imported send to backup screen
    // otherwise finish auth process
    // clean auth tmp values
    const { auth: { password, mnemonic, isImported }, isAuthLoading }: RootState = yield select()
    if (isAuthLoading) return
    yield put(setIsAuthLoading(true))
    let result: MethodResponseUnwrapped<'createWallet'> | undefined = undefined
    try {
        result = yield call(callApi, isImported ?
                'importMnemonic' : 'createWallet', CURRENT_NETWORK, mnemonic!, password!)
    } catch (e: any) {
        Alert.alert('Fail', 'Something went wrong. Please try again')
        console.log('failed to crate wallet', e)
        yield put(setIsAuthLoading(false))
        return
    }
    if (!result) {
        yield put(setIsAuthLoading(false))
        return
    }
    const { accountId, address } = result
    yield put(addAccount({ id: accountId, address, isBackupRequired: !isImported }))
    if (isImported) {
        yield put(resetAuth())
    } else {
        yield put(setAuthState(AuthState.createBackup))
    }
    yield put(setIsAuthLoading(false))
}

function* completeBackupSaga() {
    yield put(setBackupAuthModalOpen(false))
    yield put(setBackupRequestModalOpen(false))
    yield put(resetBackupRequred())
    yield delay(300)
    yield put(resetAuth())
}

function* logOutSaga({ payload: all }: ReturnType<typeof logOut>) {
    if (all) {
        yield call(callApi, 'resetAccounts')
        yield put(removeAllAccounts())
        return
    }
    const { currentAccountId, accounts }: RootState = yield select()
    const remainingAccIds = Object.keys(accounts).filter(id => id !== currentAccountId)
    if (remainingAccIds.length > 0) {
        yield put(switchAccount(remainingAccIds[remainingAccIds.length - 1]))
        yield put(removeAccount(currentAccountId!))
        yield call(callApi, 'removeAccount', currentAccountId!)
        return
    }
    yield call(callApi, 'resetAccounts')
    yield put(removeAllAccounts())
}

function* switchAccountSaga({ payload: id }: ReturnType<typeof switchAccount>) {
    yield put(setCurrentAccountId(id))
    const transactions: ApiTransaction[] = yield select(selectCurrentTransactions)
    const lastTx = transactions.find((el) => !getIsTxIdLocal(el.txId))
    yield call(callApi, 'switchAccount', id, lastTx?.txId)
}

function* addNextWalletSaga({ payload: { password, isImported } }: ReturnType<typeof addNextWallet>) {
    // check password, set password into auth state, and send to import screen or run start creating
    const { isAuthLoading }: RootState = yield select()
    if (isAuthLoading) return
    yield put(setIsAuthLoading(true))
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
        yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setAuthPasswordError('Wrong password, please try again.'))
        yield put(setIsAuthLoading(false))
        return
    }
    yield put(setAddWalletModalOpen(false))
    yield put(setAuthPassword(password))
    if (isImported) {
        yield put(setAuthState(AuthState.importWallet))
        yield put(setIsAuthLoading(false))
        return
    }
    yield put(startCreatingWallet())
    yield put(setIsAuthLoading(false))
}

function* requestMnemonicSaga({ payload: { password } }: ReturnType<typeof requestMnemonic>) {
    const { isAuthLoading }: RootState = yield select()
    if (isAuthLoading) return
    yield put(setIsAuthLoading(true))
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
        yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setAuthPasswordError('Wrong password, please try again.'))
        yield put(setIsAuthLoading(false))
        return
    }
    const { currentAccountId }: RootState = yield select()
    const mnemonic: MethodResponseUnwrapped<'getMnemonic'> = 
        yield call(callApi, 'getMnemonic', currentAccountId!, password)
    if (!mnemonic) {
        // something went wrong
        yield put(setIsAuthLoading(false))
        return
    }
    yield put(setAuthMnemonic(mnemonic))
    yield put(setIsAuthLoading(false))
}

function* activateAccountSaga() {
    const { currentAccountId }: RootState = yield select()
    const transactions: ApiTransaction[] = yield select(selectCurrentTransactions)
    const lastTx = transactions.find((el) => !getIsTxIdLocal(el.txId))
    if (!currentAccountId) return
    try {
        yield call(callApi, 'activateAccount', currentAccountId, lastTx?.txId)
    } catch (e: any) {
        console.log('failed to activate account', e?.message)
    }
}

function* gracefulyCloseRequestBackupModalSaga() {
    yield put(setBackupRequestModalOpen(false))
    yield delay(300)
    yield put(resetAuth())
}

export function* authSaga() {
    yield takeLatest(startCreatingWallet.toString(), startCreatingWalletSaga)
    yield takeLatest(importWallet.toString(), importWalletSaga)
    yield takeLatest(finishPasswordCreation.toString(), finishPasswordCreationSaga)
    yield takeLatest(createWallet.toString(), createWalletSaga)
    yield takeLatest(completeBackup.toString(), completeBackupSaga)
    yield takeLatest(switchAccount.toString(), switchAccountSaga)
    yield takeLatest(logOut.toString(), logOutSaga)
    yield takeEvery(addNextWallet.toString(), addNextWalletSaga)
    yield takeEvery(requestMnemonic, requestMnemonicSaga)
    yield takeEvery(gracefulyCloseRequestBackupModal.toString(), gracefulyCloseRequestBackupModalSaga)
    yield takeLatest(REHYDRATE, activateAccountSaga)
}