import type { ApiInitArgs, OnApiUpdate } from '../types'
import { StorageType, Storage } from '../storages/types'
import storages from '../storages'

let storage: Storage

// mock methods to test provider
export function init(onUpdate: OnApiUpdate, args: ApiInitArgs, storageType: StorageType) {
    storage = storages[storageType]
    return Promise.resolve()
}

export function foo(a: string, b: string, c: string) {
    return `foo request ${a} ${b} ${c}`
}

export function bar(a: string, b: string, c: string) {
    return new Promise((res, rej) => {
        setTimeout(() => res(`bar request ${a} ${b} ${c}`), 2000)
    })
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

export async function setItem(key: string, val: string) {
    await storage.setItem(key, val)
}

export async function getItem(key: string) {
    return storage.getItem(key)
}