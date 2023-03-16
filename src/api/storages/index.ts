import { StorageType } from './types'
import asyncStorage from './asyncStorage'
import fileStorage from './fileStorage'

export default {
  [StorageType.AsyncStorage]: asyncStorage,
  [StorageType.FileStorage]: fileStorage,
}
