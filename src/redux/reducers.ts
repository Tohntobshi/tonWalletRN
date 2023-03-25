import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiToken, ApiTransaction } from '../api/types'
import { omit } from '../api/utils/iteratees'
import { MainState, AuthState, TransferState } from '../types'

const initialState: MainState = {
    auth: {
        authState: AuthState.none,
    },
    isAuthLoading: false,
    accounts: {},
    tokenInfoBySlug: {},
    transactionsByAccountId: {},
    isTransactionsLoading: false,
    currentTransfer: {
        state: TransferState.None
    },
    isCurrentTransferLoading: false,
    modals: {},
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setIsAuthLoading: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, isAuthLoading: payload }
        },
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
            const { accounts, transactionsByAccountId } = state
            const newAccounts = omit(accounts, [id])
            const newTransactionsByAccountId = omit(transactionsByAccountId, [id])
            return { ...state, accounts: newAccounts, transactionsByAccountId: newTransactionsByAccountId }
        },
        removeAllAccounts: (state): MainState => {
            return { ...state, accounts: {}, currentAccountId: undefined, transactionsByAccountId: {} }
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
        setIsCurrentTransferLoading: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, isCurrentTransferLoading: payload }
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
        setIsTransactionsLoading: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, isTransactionsLoading: payload }
        },
        setTransactions: (state, { payload }: PayloadAction<{ accId: string; txs: ApiTransaction[] }>): MainState => {
            const { accId, txs } = payload
            const { transactionsByAccountId } = state
            return { ...state, transactionsByAccountId: { ...transactionsByAccountId, [accId]: txs } }
        },
        appendTransactions: (state, { payload }: PayloadAction<{ accId: string; newTxs: ApiTransaction[] }>): MainState => {
            const { accId, newTxs } = payload
            const { transactionsByAccountId } = state
            const oldTxList =  transactionsByAccountId[accId]
            const newTxList = oldTxList ? [...oldTxList, ...newTxs] : newTxs
            return { ...state, transactionsByAccountId: { ...transactionsByAccountId, [accId]: newTxList } }
        },
        prependTransaction: (state, { payload }: PayloadAction<{ accId: string; newTx: ApiTransaction }>): MainState => {
            const { accId, newTx } = payload
            const { transactionsByAccountId } = state
            const oldTxList =  transactionsByAccountId[accId]
            const alreadyExist = oldTxList?.find(el => el.txId === newTx.txId)
            if (alreadyExist) {
                return state
            }
            const newTxList = oldTxList ? [newTx, ...oldTxList] : [newTx]
            return { ...state, transactionsByAccountId: { ...transactionsByAccountId, [accId]: newTxList } }
        },
        updateTransactionId: (state, { payload }: PayloadAction<{ oldId: string; newId: string }>): MainState => {
            const { transactionsByAccountId } = state
            const { oldId, newId } = payload
            for (const accId of Object.keys(transactionsByAccountId)) {
                const transactions = transactionsByAccountId[accId]
                const txIndex = transactions.findIndex(el => el.txId === oldId)
                if (txIndex === -1) continue
                if (transactions.find(el => el.txId === newId)) {
                    const newTransactions = transactions.filter(el => el.txId !== oldId)
                    return { ...state, 
                        transactionsByAccountId: {
                            ...transactionsByAccountId,
                            [accId]: newTransactions
                        }
                    }
                }
                const newTransactions = [ ...transactions ]
                newTransactions[txIndex] = { ...transactions[txIndex], txId: newId }
                return { ...state, 
                    transactionsByAccountId: {
                        ...transactionsByAccountId,
                        [accId]: newTransactions
                    }
                }
            }
            return state
        },
        setBackupAuthModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, backupAuth: payload } }
        },
        setBackupRequestModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, backupRequest: payload } }
        },
        setAddWalletModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, addWallet: payload } }
        },
        setSendModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, send: payload } }
        },
        setReceiveModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, receive: payload } }
        },
        setReceiveQRModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, receiveQR: payload } }
        },
        setReceiveInvoiceModalOpen: (state, { payload }: PayloadAction<boolean>): MainState => {
            return { ...state, modals: { ...state.modals, receiveInvoice: payload } }
        },
    }
})

export const { setCurrentAccountId, setAuthState, setAuthMnemonic, setAuthPassword,
    setAuthIsImported, setAuthMnemonicError, setAuthPasswordError, resetAuth, addAccount,
    resetBackupRequred, removeAccount, removeAllAccounts, setAccountTitle, setBalance,
    updateTokenInfo, setCurrentTransferState, resetCurrentTransfer, setCurrentTransferError,
    setCurrentTransfer, setCurrentTransferInitialBalance, setIsTransactionsLoading,
    appendTransactions, prependTransaction, updateTransactionId, setTransactions,
    setIsAuthLoading, setIsCurrentTransferLoading, setBackupAuthModalOpen, setBackupRequestModalOpen,
    setAddWalletModalOpen, setSendModalOpen, setReceiveModalOpen, setReceiveQRModalOpen,
    setReceiveInvoiceModalOpen } = mainSlice.actions
