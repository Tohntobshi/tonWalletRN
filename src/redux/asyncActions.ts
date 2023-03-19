import { createAction } from '@reduxjs/toolkit'
import type { ApiUpdate } from '../api/types'

export const apiUpdate = createAction<ApiUpdate>('api_update')


// auth
export const startCreatingWallet = createAction('start_creating_wallet')
