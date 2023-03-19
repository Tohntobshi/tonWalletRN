import { call, put, Effect, take, fork, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { initApi } from '../../api'
import type { ApiUpdate } from '../../api/types'
import { apiUpdate } from '../asyncActions'

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
    // console.log('received api update', payload)
}

export function* apiSaga() {
    yield fork(apiLoopSaga)
    yield takeEvery(apiUpdate.toString(), apiUpdateSaga)
}


