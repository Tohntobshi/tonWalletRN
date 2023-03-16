import { promises as fspromises } from 'fs'
import path from 'path'
import rnBridge from 'rn-bridge'
import { Storage } from './types'

const dir = rnBridge.app.datadir() as string

export default {
  getItem: (key: string) => {
    if (!key) return Promise.reject('no key')
    return fspromises.readFile(path.join(dir, key), { encoding: 'utf-8' })
  },
  setItem: (key: string, val: any) => {
    if (!key) return Promise.reject('no key')
    return fspromises.writeFile(path.join(dir, key), val, { encoding: 'utf-8' })
  },
  removeItem: (key: string) => {
    if (!key) return Promise.reject('no key')
    return fspromises.unlink(path.join(dir, key))
  },
  clear: async () => {
    const files = await fspromises.readdir(dir)
    for (const file of files) {
      await fspromises.unlink(path.join(dir, file))
    }
  },
} as Storage
