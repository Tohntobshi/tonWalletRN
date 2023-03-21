import { call, put, Effect, take, fork, takeEvery, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { initApi } from '../../api'
import type { ApiUpdate } from '../../api/types'
import { apiUpdate } from '../asyncActions'
import { setBalance, updateTokenInfo } from '../reducers'
import isPartialDeepEqual from '../../utils/isPartialDeepEqual'
import { RootState } from '../types'

function initializeApi() {
    return eventChannel(emitter => {
        initApi((data) => emitter(data), { origin: 'rn' })
        return () => {
            // resource should be freed here
        }
    })
}

function* apiLoopSaga(): Generator<Effect, void, any> {
    const chan = yield call(initializeApi)
    try {
        while (true) {
            const update: ApiUpdate = yield take(chan)
            yield put(apiUpdate(update))
        }
    } finally {
        
    }
}

function* apiUpdateSaga({ payload }: ReturnType<typeof apiUpdate>) {
    switch(payload.type) {
        case 'updateBalance':
            yield put(setBalance({
                accountId: payload.accountId,
                slug: payload.slug,
                balance: payload.balance
            }))
            break
        case 'updateTokens':
            const { tokenInfoBySlug }: RootState = yield select()
            if (isPartialDeepEqual(tokenInfoBySlug, payload.tokens)) break
            yield put(updateTokenInfo(payload.tokens))
            break
    }
}

export function* apiSaga() {
    yield fork(apiLoopSaga)
    yield takeEvery(apiUpdate.toString(), apiUpdateSaga)
}


