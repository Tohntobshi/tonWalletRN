import { call, put, takeLatest, select } from 'redux-saga/effects'
import { validateSendRequest, send } from '../asyncActions'
import { callApi } from '../../api'
import { setCurrentTransfer, setCurrentTransferError,
    setCurrentTransferInitialBalance, setCurrentTransferState } from '../reducers'
import { MethodResponseUnwrapped } from '../../api/methods/types'
import { TransferState } from '../../types'
import { RootState } from '../types'
import { humanToBigStr } from '../../utils'


function* validateSendRequestSaga({ payload }: ReturnType<typeof validateSendRequest>) {
    const { address, amount, comment, slug } = payload
    const { currentAccountId, tokenInfoBySlug }: RootState = yield select()
    const tokenInfo = tokenInfoBySlug[slug]
    const { error, fee }: MethodResponseUnwrapped<'checkTransactionDraft'> = 
        yield call(callApi, 'checkTransactionDraft', currentAccountId!, slug, address,
        humanToBigStr(amount, tokenInfo?.decimals), comment)
    if (error) {
        yield put(setCurrentTransferError(error))
        return
    }
    yield put(setCurrentTransfer({
        state: TransferState.Confirm,
        amount,
        toAddress: address,
        tokenSlug: slug,
        fee,
        comment
    }))
}

function* sendSaga({ payload: { password, initialBalance } }: ReturnType<typeof send>) {
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
    yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setCurrentTransferError('Wrong password, please try again.'))
        return
    }
    yield put(setCurrentTransferInitialBalance(initialBalance))
    const { currentAccountId, currentTransfer, tokenInfoBySlug }: RootState = yield select()
    const { tokenSlug, toAddress, amount, comment, fee } = currentTransfer
    const tokenInfo = tokenInfoBySlug[tokenSlug!]
    const result: MethodResponseUnwrapped<'submitTransfer'> =
        yield call(callApi, 'submitTransfer', currentAccountId!, password, tokenSlug!,
        toAddress!, humanToBigStr(amount || 0, tokenInfo?.decimals), comment, fee)
    if (!result) {
        yield put(setCurrentTransferError('Something went wrong.'))
        return
    }
    yield put(setCurrentTransferState(TransferState.Complete))
}


export function* transactionsSaga() {
    yield takeLatest(validateSendRequest.toString(), validateSendRequestSaga)
    yield takeLatest(send.toString(), sendSaga)
}