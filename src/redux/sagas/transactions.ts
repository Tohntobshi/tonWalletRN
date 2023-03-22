import { call, put, select, takeEvery } from 'redux-saga/effects'
import { validateSendRequest, send, requestTransactions, apiUpdate } from '../asyncActions'
import { callApi } from '../../api'
import { appendTransactions, prependTransaction, setCurrentTransfer, setCurrentTransferError,
    setCurrentTransferInitialBalance, setCurrentTransferState, setIsCurrentTransferLoading,
    setIsTransactionsLoading, setTransactions, updateTransactionId } from '../reducers'
import { MethodResponseUnwrapped } from '../../api/methods/types'
import { TransferState } from '../../types'
import { RootState } from '../types'
import { humanToBigStr } from '../../utils'
import { selectCurrentTransactions } from '../selectors'
import { ApiTransaction } from '../../api/types'


function* validateSendRequestSaga({ payload }: ReturnType<typeof validateSendRequest>) {
    const { address, amount, comment, slug } = payload
    const { currentAccountId, tokenInfoBySlug, isCurrentTransferLoading }: RootState = yield select()
    if (isCurrentTransferLoading) return
    yield put(setIsCurrentTransferLoading(true))
    const tokenInfo = tokenInfoBySlug[slug]
    const { error, fee }: MethodResponseUnwrapped<'checkTransactionDraft'> = 
        yield call(callApi, 'checkTransactionDraft', currentAccountId!, slug, address,
        humanToBigStr(amount, tokenInfo?.decimals), comment)
    if (error) {
        yield put(setCurrentTransferError(error))
        yield put(setIsCurrentTransferLoading(false))
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
    yield put(setIsCurrentTransferLoading(false))
}

function* sendSaga({ payload: { password, initialBalance } }: ReturnType<typeof send>) {
    const { isCurrentTransferLoading }: RootState = yield select()
    if (isCurrentTransferLoading) return
    yield put(setIsCurrentTransferLoading(true))
    const isPasswordValid: MethodResponseUnwrapped<'verifyPassword'> = 
    yield call(callApi, 'verifyPassword', password)
    if (!isPasswordValid) {
        yield put(setCurrentTransferError('Wrong password, please try again.'))
        yield put(setIsCurrentTransferLoading(false))
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
        yield put(setIsCurrentTransferLoading(false))
        return
    }
    yield put(setCurrentTransferState(TransferState.Complete))
    yield put(setIsCurrentTransferLoading(false))
}

function* requestTransactionsSaga({ payload: { isRefresh } }: ReturnType<typeof requestTransactions>) {
    const { currentAccountId, isTransactionsLoading }: RootState = yield select()
    if (isTransactionsLoading || !currentAccountId) return
    yield put(setIsTransactionsLoading(true))
    
    const transactions: ApiTransaction[] = yield select(selectCurrentTransactions)
    const firstTxId = transactions.length === 0 || isRefresh ? undefined :
        transactions[transactions.length - 1].txId
    const result: MethodResponseUnwrapped<'fetchTransactionSlice'> =
        yield call(callApi, 'fetchTransactionSlice', currentAccountId!, firstTxId, firstTxId ? 20 : undefined)
    if (result.length) {
        if (isRefresh) {
            yield put(setTransactions({ accId: currentAccountId, txs: result }))
        } else {
            yield put(appendTransactions({ accId: currentAccountId, newTxs: result }))
        }
    }
    yield put(setIsTransactionsLoading(false))
}

function* apiUpdateSaga({ payload }: ReturnType<typeof apiUpdate>) {
    switch(payload.type) {
        case 'newTransaction':
            yield put(prependTransaction({
                accId: payload.accountId,
                newTx: payload.transaction
            }))
            break
        case 'updateTxComplete':
            yield put(updateTransactionId({
                oldId: payload.localTxId,
                newId: payload.txId
            }))
            break
    }
}


export function* transactionsSaga() {
    yield takeEvery(validateSendRequest.toString(), validateSendRequestSaga)
    yield takeEvery(send.toString(), sendSaga)
    yield takeEvery(requestTransactions.toString(), requestTransactionsSaga)
    yield takeEvery(apiUpdate.toString(), apiUpdateSaga)
}