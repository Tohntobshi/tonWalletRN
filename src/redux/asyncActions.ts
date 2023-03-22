import { createAction } from '@reduxjs/toolkit'
import type { ApiUpdate } from '../api/types'

export const apiUpdate = createAction<ApiUpdate>('api_update')


// auth
export const startCreatingWallet = createAction('start_creating_wallet')
export const importWallet = createAction<string[]>('import_wallet')
export const finishPasswordCreation = createAction<string>('finish_password_creation')
export const createWallet = createAction('create_wallet')
export const completeBackup = createAction('complete_backup')
export const switchAccount = createAction<string>('switch_account')
export const logOut = createAction<boolean>('log_out')
export const addNextWallet = createAction<{ password: string, isImported: boolean }>('add_next_wallet')
export const requestMnemonic = createAction<{ password: string }>('request_mnemonic')

// transactions
export const validateSendRequest = createAction<{ slug: string; address: string; amount: number; comment: string }>('validate_send_request')
export const send = createAction<{ password: string, initialBalance: number }>('send')
export const requestTransactions = createAction<{ isRefresh: boolean }>('request_transactions')
