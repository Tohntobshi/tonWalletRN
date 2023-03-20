import { RootState } from './types'

export const isBackedUpSelector = (state: RootState) => {
    const { currentAccountId, accounts } = state
    if (!currentAccountId) return false
    return !(accounts[currentAccountId]?.isBackupRequired)
}