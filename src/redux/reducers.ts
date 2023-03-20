import { createSlice, PayloadAction, createReducer } from '@reduxjs/toolkit'
import { omit } from '../api/utils/iteratees'

export enum AuthState {
    none,
    creatingWallet,
    importWallet,
    createPassword,
    createBackup,
}

export interface AccountState {
    title: string;
    address: string;
    isBackupRequired: boolean;
}

export interface MainState {
    auth: {
        authState: AuthState;
        mnemonic?: string[];
        password?: string;
        isImported?: boolean;
        mnemonicError?: string;
        passwordError?: string;
    };
    currentAccountId?: string;
    accounts: Record<string, AccountState>;
}


const initialState: MainState = {
    auth: {
        authState: AuthState.none,
    },
    accounts: {},
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
        addAccount: (state, { payload: { id, address, isBackupRequired } }:PayloadAction<{ id: string; address: string; isBackupRequired: boolean }>): MainState => {
            return { ...state, currentAccountId: id,
                accounts: {...state.accounts, [id]: { title: 'Personal Wallet', address, isBackupRequired } }}
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
    }
})

export const { setCurrentAccountId, setAuthState, setAuthMnemonic, setAuthPassword,
    setAuthIsImported, setAuthMnemonicError, setAuthPasswordError, resetAuth, addAccount,
    resetBackupRequred, removeAccount, removeAllAccounts } = mainSlice.actions