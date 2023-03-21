import { UserToken } from "../types"
import { calcChangeValue } from "./calcChangeValue"
import { formatInteger } from "./formatNumber"
import { round } from "./round"

export function buildWalletSelectorValues(tokens: UserToken[]) {
    const primaryValue = tokens.reduce((acc, token) => acc + token.amount * token.price, 0)
    const [primaryWholePart, primaryFractionPart] = formatInteger(primaryValue).split('.')
    const changeValue = round(tokens.reduce((acc, token) => {
        return acc + calcChangeValue(token.amount * token.price, token.change24h)
    }, 0), 4)

    const changePercent = round(primaryValue ? (changeValue / (primaryValue - changeValue)) * 100 : 0, 2)
    const changeStyle = changePercent > 0 ? 'up' : (changePercent < 0 ? 'down' : undefined)
    const changePrefix = changeValue > 0 ? '↑' : changeValue < 0 ? '↓' : undefined

    return {
        primaryValue,
        primaryWholePart,
        primaryFractionPart,
        changePrefix,
        changePercent,
        changeValue,
        changeStyle,
    }
}