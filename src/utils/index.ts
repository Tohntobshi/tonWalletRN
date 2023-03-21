import { DEFAULT_DECIMAL_PLACES } from "../config"

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

  export function bigStrToHuman(amount: string, decimalPlaces?: number) {
    if (decimalPlaces === undefined) decimalPlaces = DEFAULT_DECIMAL_PLACES;
    return divideBigInt(BigInt(amount), BigInt(10 ** decimalPlaces));
  }
  
  export function humanToBigStr(amount: number, decimalPlaces?: number) {
    if (decimalPlaces === undefined) decimalPlaces = DEFAULT_DECIMAL_PLACES;
    return String(Math.round(amount * (10 ** decimalPlaces)));
  }
  
  function divideBigInt(a: bigint, b: bigint) {
    const div = a / b;
    return Number(div) + Number(a - div * b) / Number(b);
  }
  
  export function getIsTxIdLocal(txId: string) {
    return txId.includes('|');
  }