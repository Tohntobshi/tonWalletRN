import { call, put, Effect, take, takeLatest } from 'redux-saga/effects'
import { startCreatingWallet } from '../asyncActions'

function* startCreatingWalletSaga() {
    console.log('start creating')
}

export function* authSaga() {
    yield takeLatest(startCreatingWallet.toString(), startCreatingWalletSaga)
}