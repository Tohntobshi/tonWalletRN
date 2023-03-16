import { Storage } from './types'

// TODO
export default {
  getItem: (key: string) => Promise.resolve(''),
  setItem: (key: string, val: any) => Promise.resolve(),
  removeItem: (key: string) => Promise.resolve(),
  clear: () => Promise.resolve(),
} as Storage
