import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiToken } from '../api/types'
import { omit } from '../api/utils/iteratees'
import { MainState, AuthState, TransferState } from '../types'

const initialState: MainState = {
    auth: {
        authState: AuthState.none,
    },
    accounts: {},
    tokenInfoBySlug: {},
    currentTransfer: {
        state: TransferState.None
    }
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setCurrentAccountId: (state, { payload }: PayloadAction<string | undefined>): MainState => {
            return { ...state, currentAccountId: payload }
        },
        setAuthState: (state, { payload }: PayloadAction<AuthState>): MainState => {
            return { ...state, auth: { ...state.auth, authState: payload }  }
        },
        setAuthMnemonic: (state, { payload }: PayloadAction<string[] | undefined>): MainState => {
            return { ...state, auth: { ...state.auth, mnemonic: payload } }
        },
        setAuthPassword: (state, { payload }: PayloadAction<string | undefined>): MainState => {
            return { ...state, auth: { ...state.auth, password: payload } }
        },
        setAuthIsImported: (state, { payload }: PayloadAction<boolean | undefined>): MainState => {
            return { ...state, auth: { ...state.auth, isImported: payload } }
        },
        setAuthMnemonicError: (state, { payload }: PayloadAction<string | undefined>): MainState => {
            return { ...state, auth: { ...state.auth, mnemonicError: payload } }
        },
        setAuthPasswordError: (state, { payload }: PayloadAction<string | undefined>): MainState => {
            return { ...state, auth: { ...state.auth, passwordError: payload } }
        },
        resetAuth: (state): MainState => {
            return { ...state, auth: initialState.auth }
        },
        addAccount: (state, { payload: { id, address, isBackupRequired } }: PayloadAction<{ id: string; address: string; isBackupRequired: boolean }>): MainState => {
            return { ...state, currentAccountId: id,
                accounts: {...state.accounts, [id]: { title: 'Personal Wallet', address, isBackupRequired, balancesBySlug: {} } }}
        },
        resetBackupRequred: (state): MainState => {
            const { currentAccountId: id } = state
            if (!id) return state
            return { ...state, accounts: { ...state.accounts, [id]: { ...state.accounts[id], isBackupRequired: false } } }
        },
        removeAccount: (state, { payload: id }: PayloadAction<string>): MainState => {
            const { accounts } = state
            const newAccounts = omit(accounts, [id])
            return { ...state, accounts: newAccounts }
        },
        removeAllAccounts: (state): MainState => {
            return { ...state, accounts: {}, currentAccountId: undefined }
        },
        setAccountTitle: (state, { payload: { id, title } }: PayloadAction<{ id: string, title: string }>): MainState => {
            const { accounts } = state
            const newAccounts = { ...accounts, [id]: { ...accounts[id], title } }
            return { ...state, accounts: newAccounts }
        },
        setBalance: (state, { payload: { accountId, balance, slug } }: PayloadAction<{ accountId: string, balance: string, slug: string }>): MainState => {
            const { accounts } = state
            const account = accounts[accountId]
            if (!account) return state
            const newAccounts = { ...accounts,
                [accountId]: { ...account, balancesBySlug: { ...account.balancesBySlug, [slug]: balance } }
            }
            return { ...state, accounts: newAccounts }
        },
        updateTokenInfo: (state, { payload }: PayloadAction<Record<string, ApiToken>>): MainState => {
            const { tokenInfoBySlug } = state
            return { ...state, tokenInfoBySlug: { ...tokenInfoBySlug, ...payload } }
        },
        setCurrentTransferState: (state, { payload }: PayloadAction<TransferState>): MainState => {
            return { ...state, currentTransfer: { ...state.currentTransfer, state: payload }  }
        },
        setCurrentTransferError: (state, { payload }: PayloadAction<string | undefined>): MainState => {
            return { ...state, currentTransfer: { ...state.currentTransfer, error: payload }  }
        },
        setCurrentTransferInitialBalance: (state, { payload }: PayloadAction<number | undefined>): MainState => {
            return { ...state, currentTransfer: { ...state.currentTransfer, initialBalance: payload } }
        },
        setCurrentTransfer: (state, { payload }: PayloadAction<MainState['currentTransfer']>): MainState => {
            return { ...state, currentTransfer: payload }
        },
        resetCurrentTransfer: (state): MainState => {
            return { ...state, currentTransfer: initialState.currentTransfer }
        },
    }
})

export const { setCurrentAccountId, setAuthState, setAuthMnemonic, setAuthPassword,
    setAuthIsImported, setAuthMnemonicError, setAuthPasswordError, resetAuth, addAccount,
    resetBackupRequred, removeAccount, removeAllAccounts, setAccountTitle, setBalance,
    updateTokenInfo, setCurrentTransferState, resetCurrentTransfer, setCurrentTransferError,
    setCurrentTransfer, setCurrentTransferInitialBalance } = mainSlice.actions