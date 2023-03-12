export function shortenString(text: string, partLength: number = 6) {
    const length = partLength * 2 + 3
    if (text.length <= length) return text
    return text.slice(0, partLength) + '...' + text.slice(text.length - partLength, text.length)
}