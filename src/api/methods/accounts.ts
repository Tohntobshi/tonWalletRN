import { OnApiUpdate } from '../types';
import { Storage } from '../storages/types';

import { migrateStorage } from '../common/helpers';

// import * as dappMethods from '../dappMethods';
import { setupBalancePolling, setupBackendStakingStatePolling } from './polling';
// import { deactivateAllDapps, onActiveDappAccountUpdated } from './dapps';
// import { IS_EXTENSION } from '../environment'; TODO

// let onUpdate: OnApiUpdate;
let storage: Storage;
let activeAccountId: string | undefined;

export function initAccounts(_onUpdate: OnApiUpdate, _storage: Storage) {
  // onUpdate = _onUpdate;
  storage = _storage;
}

export async function switchAccount(accountId: string, newestTxId?: string) {
  deactivateAccount();
  await activateAccount(accountId, newestTxId);
}

export async function activateAccount(accountId: string, newestTxId?: string) {
  await migrateStorage(storage);

  activeAccountId = accountId;

  // if (IS_EXTENSION) { TODO
  //   dappMethods.activateDappAccount(accountId);
  //   onActiveDappAccountUpdated(accountId);
  // }

  void setupBalancePolling(accountId, newestTxId);
  void setupBackendStakingStatePolling(accountId);
}

export function deactivateAccount() {
  // dappMethods.deactivateDappAccount(); TODO
  activeAccountId = undefined;
}

export function deactivateAllAccounts() {
  deactivateAccount();
  // if (IS_EXTENSION) { TODO
  //   deactivateAllDapps();
  // }
}

export function isAccountActive(accountId: string) {
  return activeAccountId === accountId;
}
