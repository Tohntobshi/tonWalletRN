import { REHYDRATE } from 'redux-persist'
import { call, put, takeLatest, all, delay, select } from 'redux-saga/effects'
import { addNextWallet, completeBackup, createWallet, finishPasswordCreation,
    importWallet, logOut, requestMnemonic, startCreatingWallet, switchAccount
} from '../asyncActions'
import { callApi } from '../../api'
import { setAuthState, setAuthMnemonic, setAuthMnemonicError,
    setAuthPassword, setAuthIsImported, addAccount, resetAuth,
    resetBackupRequred, removeAllAccounts, setAuthPasswordError,
    setCurrentAccountId, removeAccount } from '../reducers'
import { MethodResponseUnwrapped } from '../../api/methods/types'
import { AuthState } from '../../types'
import { RootState } from '../types'
import { CURRENT_NETWORK } from '../../config'


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
    const mnemonic = payload.map(el => el.toLowerCase().trim())
    const isValid: MethodResponseUnwrapped<'validateMnemonic'> =
        yield call(callApi, 'validateMnemonic', mnemonic)
    if (!isValid) {
        yield put(setAuthMnemonicError('Your mnemonic words are invalid.'))
        return
    }
    yield put(setAuthIsImported(true))
    yield put(setAuthMnemonic(mnemonic))
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
    const { auth: { password, mnemonic, isImported } }: RootState = yield select()
    const result: MethodResponseUnwrapped<'createWallet'> =
        yield call(callApi, isImported ?
            'importMnemonic' : 'createWallet', CURRENT_NETWORK, mnemonic!, password!)
    if (!result) return
    const { accountId, address } = result
    yield put(addAccount({ id: accountId, address, isBackupRequired: !isImported }))
    if (isImported) {
        yield put(resetAuth())
    } else {
        yield put(setAuthState(AuthState.createBackup))
    }
}

function* completeBackupSaga() {
    yield put(resetBackupRequred())
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
    // TODO add newestTxId to apicall whatever it is
    yield put(setCurrentAccountId(id))
    yield call(callApi, 'switchAccount', id)
}

function* addNextWalletSaga({ payload: { password, isImported } }: ReturnType<typeof addNextWallet>) {
    // check password, set password into auth state, and send to import screen or run start creating
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
        yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setAuthPasswordError('Wrong password, please try again.'))
        return
    }
    yield put(setAuthPassword(password))
    if (isImported) {
        yield put(setAuthState(AuthState.importWallet))
        return
    }
    yield put(startCreatingWallet())
}

function* requestMnemonicSaga({ payload: { password } }: ReturnType<typeof requestMnemonic>) {
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
        yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setAuthPasswordError('Wrong password, please try again.'))
        return
    }
    const { currentAccountId }: RootState = yield select()
    const mnemonic: MethodResponseUnwrapped<'getMnemonic'> = 
        yield call(callApi, 'getMnemonic', currentAccountId!, password)
    if (!mnemonic) {
        // something went wrong
        return
    }
    yield put(setAuthMnemonic(mnemonic))
}

export function* activateAccountSaga() {
    // TODO add newestTxId to apicall whatever it is
    const { currentAccountId }: RootState = yield select()
    if (!currentAccountId) return
    yield call(callApi, 'activateAccount', currentAccountId)
}

export function* authSaga() {
    yield takeLatest(startCreatingWallet.toString(), startCreatingWalletSaga)
    yield takeLatest(importWallet.toString(), importWalletSaga)
    yield takeLatest(finishPasswordCreation.toString(), finishPasswordCreationSaga)
    yield takeLatest(createWallet.toString(), createWalletSaga)
    yield takeLatest(completeBackup.toString(), completeBackupSaga)
    yield takeLatest(switchAccount.toString(), switchAccountSaga)
    yield takeLatest(logOut.toString(), logOutSaga)
    yield takeLatest(addNextWallet.toString(), addNextWalletSaga)
    yield takeLatest(requestMnemonic, requestMnemonicSaga)
    yield takeLatest(REHYDRATE, activateAccountSaga)
    // TODO add pending flags and block ui during loading
}