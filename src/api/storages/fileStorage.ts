import { promises as fspromises } from 'fs'
import path from 'path'
import rnBridge from 'rn-bridge'
import { Storage } from './types'

const dir = rnBridge.app.datadir() as string

export async function initFileStorage() {
  try {
    await fspromises.mkdir(path.join(dir, 'values'))
  } catch (e) {
    return
  }
}

export default {
  getItem: async (key: string) => {
    if (!key) return Promise.reject('no key')
    try {
      const data = await fspromises.readFile(path.join(dir, 'values', key), { encoding: 'utf-8' })
      const isString = data.slice(0, 1) === 's'
      return isString ? data.slice(1, data.length) : JSON.parse(data.slice(1, data.length))
    } catch (e) {
      return null
    }
  },
  setItem: async (key: string, val: any) => {
    if (!key) return Promise.reject('no key')
    const isString = typeof val === 'string'
    const valueToSave = isString ? 's' + val : 'n' + JSON.stringify(val)
    return fspromises.writeFile(path.join(dir, 'values', key), valueToSave, { encoding: 'utf-8' })
  },
  removeItem: async (key: string) => {
    if (!key) return Promise.reject('no key')
    try {
      return await fspromises.unlink(path.join(dir, 'values', key))
    } catch (e) {
    }
  },
  clear: async () => {
    try {
      const files = await fspromises.readdir(path.join(dir, 'values'))
      for (const file of files) {
        await fspromises.unlink(path.join(dir, 'values', file))
      }
    } catch (e) {
      return
    }
  },
} as Storage
