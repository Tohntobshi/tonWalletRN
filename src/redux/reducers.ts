import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum AuthState {
    none,
    creatingWallet,
    createPassword,
    createBackup,
    checkMnemonic,
    importWallet,
    importWalletCreatePassword,
    // ready,
}

export interface AccountState {
    title?: string;
    address: string;
}

export interface MainState {
    authState: AuthState;
    currentAccountId?: string;
    accounts: Record<string, AccountState>;
}
  

const initialState: MainState = {
    authState: AuthState.none,
    accounts: {},
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setCurrentAccountId: (state, { payload }: PayloadAction<string | undefined>) => {
            return { ...state, currentAccountId: payload }
        },
        setAuthState: (state, { payload }: PayloadAction<AuthState>) => {
            return { ...state, authState: payload }
        },
    }
})

export const { setCurrentAccountId } = mainSlice.actions