import { ApiHistoryList, ApiToken, ApiTransaction } from './api/types'

export type UserToken = {
    amount: number;
    name: string;
    symbol: string;
    image?: string;
    slug: string;
    price: number;
    decimals: number;
    change24h: number;
    change7d: number;
    change30d: number;
    history24h?: ApiHistoryList;
    history7d?: ApiHistoryList;
    history30d?: ApiHistoryList;
}

export enum AuthState {
    none,
    creatingWallet,
    importWallet,
    createPassword,
    createBackup,
}

export enum TransferState {
    None,
    Confirm,
    Password,
    Complete,
}

export interface AccountState {
    title: string;
    address: string;
    isBackupRequired: boolean;
    balancesBySlug: Record<string, string>;
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
    isAuthLoading: boolean;
    currentTransfer: {
        state: TransferState;
        tokenSlug?: string;
        toAddress?: string;
        error?: string;
        amount?: number;
        fee?: string;
        comment?: string;
        initialBalance?: number;
    };
    isCurrentTransferLoading: boolean;
    transactionsByAccountId: Record<string, ApiTransaction[]>;
    isTransactionsLoading: boolean;
    tokenInfoBySlug: Record<string, ApiToken>;
    currentAccountId?: string;
    accounts: Record<string, AccountState>;
    modals: {
        backupAuth?: boolean;
        backupRequest?: boolean;
        addWallet?: boolean;
        send?: boolean;
        receive?: boolean;
        receiveQR?: boolean;
        receiveInvoice?: boolean;
    }
}