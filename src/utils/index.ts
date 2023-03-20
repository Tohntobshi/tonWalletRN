export function shortenString(text: string, partLength: number = 6) {
    const length = partLength * 2 + 3
    if (text.length <= length) return text
    return text.slice(0, partLength) + '...' + text.slice(text.length - partLength, text.length)
}

export function selectMnemonicForCheck() {
    const MNEMONIC_COUNT = 24
    const MNEMONIC_CHECK_COUNT = 3
    return Array(MNEMONIC_COUNT)
      .fill(0)
      .map((_, i) => ({ i, rnd: Math.random() }))
      .sort((a, b) => a.rnd - b.rnd)
      .map((i) => i.i)
      .slice(0, MNEMONIC_CHECK_COUNT)
      .sort((a, b) => a - b);
  }