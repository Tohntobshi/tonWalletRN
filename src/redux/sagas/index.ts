import { fork } from 'redux-saga/effects'
import { apiSaga } from './apiSaga'
import { authSaga } from './auth'


function* rootSaga() {
    yield fork(apiSaga)
    yield fork(authSaga)
}

export default rootSaga