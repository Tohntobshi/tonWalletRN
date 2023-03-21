import { fork } from 'redux-saga/effects'
import { apiSaga } from './apiSaga'
import { authSaga } from './auth'
import { transactionsSaga } from './transactions'


function* rootSaga() {
    yield fork(apiSaga)
    yield fork(authSaga)
    yield fork(transactionsSaga)
}

export default rootSaga