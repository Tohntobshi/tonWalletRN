import AsyncStorage from '@react-native-async-storage/async-storage'
import { Storage } from './types'


export default {
  getItem: AsyncStorage.getItem,
  setItem: AsyncStorage.setItem,
  removeItem: AsyncStorage.removeItem,
  clear: AsyncStorage.clear,
} as Storage
