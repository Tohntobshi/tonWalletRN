import { encryptMnemonic } from '../blockchains/ton'


// mock methods to test provider
export async function foo(a: string, b: string, c: string) {


}

export function bar(a: string[], b: string) {
    return encryptMnemonic(a, b)
}

export function fooFail(a: string, b: string, c: string) {
    throw new Error('foo failed successfuly')
    return `foo request ${a} ${b} ${c}`
}

export function barFail(a: string, b: string, c: string) {
    return new Promise((res, rej) => {
        setTimeout(() => rej(new Error('bar failed successfuly')), 2000)
    })
}

// export async function setItem(key: string, val: string) {
//     await storage.setItem(key, val)
// }

// export async function getItem(key: string) {
//     return storage.getItem(key)
// }

