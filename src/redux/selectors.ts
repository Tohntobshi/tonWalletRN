import { ApiToken } from '../api/types'
import memoized from '../api/utils/memoized'
import { UserToken } from '../types'
import { bigStrToHuman } from '../utils'
import { round } from '../utils/round'
import { RootState } from './types'

export const selectIsBackedUp = (state: RootState) => {
    const { currentAccountId, accounts } = state
    if (!currentAccountId) return false
    return !(accounts[currentAccountId]?.isBackupRequired)
}

export const selectCurrentAccount = (state: RootState) => {
    const { currentAccountId, accounts } = state
    if (!currentAccountId) return undefined
    return accounts[currentAccountId]
}

export const selectAccountTokensMemoized = memoized((
    balancesBySlug: Record<string, string>,
    tokenInfoBySlug: Record<string, ApiToken>,
) => {
    return Object
        .entries(balancesBySlug)
        .filter(([slug]) => (slug in tokenInfoBySlug))
        .map(([slug, balance]) => {
            const {
                symbol, name, image, decimals, quote: {
                    price, percentChange24h, percentChange7d, percentChange30d, history7d, history24h, history30d,
                },
            } = tokenInfoBySlug[slug];
            const amount = bigStrToHuman(balance, decimals);

            return {
                symbol,
                slug,
                amount,
                name,
                image,
                price,
                decimals,
                change24h: round(percentChange24h / 100, 4),
                change7d: round(percentChange7d / 100, 4),
                change30d: round(percentChange30d / 100, 4),
                history24h,
                history7d,
                history30d,
            } as UserToken;
        });
});

export function selectCurrentAccountTokens(state: RootState) {
    const balancesBySlug = selectCurrentAccount(state)?.balancesBySlug
    if (!balancesBySlug) return undefined
    return selectAccountTokensMemoized(balancesBySlug, state.tokenInfoBySlug)
}