import { ApiHistoryList, ApiToken } from "./api/types";

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
    tokenInfoBySlug: Record<string, ApiToken>;
    currentAccountId?: string;
    accounts: Record<string, AccountState>;
}