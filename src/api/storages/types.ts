export enum StorageType {
  AsyncStorage,
  FileStorage,
}

export interface Storage {
  getItem(name: string): Promise<any>;

  setItem(name: string, value: any): Promise<void>;

  removeItem(name: string): Promise<void>;

  clear(): Promise<void>;
}
