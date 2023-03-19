import type { ApiInitArgs, OnApiUpdate } from '../types';
import type { Storage } from '../storages/types';

// import { IS_EXTENSION } from '../environment'; TODO
import * as methods from './index';
// import * as dappMethods from '../dappMethods'; TODO
// import * as legacyDappMethods from '../dappMethods/legacy';
// import * as tonConnect from '../tonConnect';
import { connectUpdater } from '../common/helpers';

export default function init(onUpdate: OnApiUpdate, args: ApiInitArgs, _storage: Storage) {
  connectUpdater(onUpdate);

  const storage = _storage;

  methods.initAccounts(onUpdate, storage);
  methods.initPolling(onUpdate, storage, methods.isAccountActive, args);
  void methods.setupPricesPolling();
  methods.initAuth(onUpdate, storage);
  // methods.initTransactions(onUpdate, storage); TODO
  void methods.initWallet(onUpdate, storage);
  // methods.initNfts(storage);
  // void methods.initExtension(storage);
  methods.initStaking(onUpdate, storage);

  // if (IS_EXTENSION) { TODO
  //   methods.initDapps(onUpdate, storage);
  //   legacyDappMethods.initLegacyDappMethods(onUpdate);
  //   dappMethods.initDappMethods(onUpdate);
  //   tonConnect.initTonConnect(onUpdate);
  // }
}
