import type { ApiNetwork, OnApiUpdate } from '../types';
import type { Storage } from '../storages/types';

import blockchains from '../blockchains';

import { getNewAccountId, removeAccountValue, setAccountValue } from '../common/accounts';
import { bytesToHex } from '../common/utils';

import { activateAccount, deactivateAccount, deactivateAllAccounts } from './accounts';
// import { IS_EXTENSION } from '../environment'; TODO
// import { deactivateAccountDapp } from './dapps';

// let onUpdate: OnApiUpdate;
let storage: Storage;

export function initAuth(_onUpdate: OnApiUpdate, _storage: Storage) {
  // onUpdate = _onUpdate;
  storage = _storage;
}

export function generateMnemonic() {
  return blockchains.ton.generateMnemonic();
}

export async function createWallet(network: ApiNetwork, mnemonic: string[], password: string) {
  const {
    mnemonicToSeed,
    seedToKeyPair,
    publicKeyToAddress,
  } = blockchains.ton;

  if (!await validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic');
  }
  
  const seedBase64 = await mnemonicToSeed(mnemonic);
  const { publicKey } = seedToKeyPair(seedBase64);
  const address = await publicKeyToAddress(network, publicKey);
  
  const accountId = await getNewAccountId(storage, network);
  await storeAccount(accountId, mnemonic, password, publicKey, address);
  void activateAccount(accountId);

  return {
    accountId,
    address,
  };
}

export function validateMnemonic(mnemonic: string[]) {
  return blockchains.ton.validateMnemonic(mnemonic);
}

export async function importMnemonic(network: ApiNetwork, mnemonic: string[], password: string) {
  const {
    mnemonicToSeed,
    seedToKeyPair,
    pickBestWallet,
  } = blockchains.ton;

  if (!await validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic');
  }

  const seedBase64 = await mnemonicToSeed(mnemonic);
  const { publicKey } = seedToKeyPair(seedBase64);
  
  const wallet = await pickBestWallet(network, publicKey);
  const address = (await wallet.getAddress()).toString(true, true, true);

  const accountId: string = await getNewAccountId(storage, network);
  await storeAccount(accountId, mnemonic, password, publicKey, address);
  void activateAccount(accountId);

  return {
    accountId,
    address,
  };
}

async function storeAccount(
  accountId: string, mnemonic: string[], password: string, publicKey: Uint8Array, address: string,
) {
  const mnemonicEncrypted = await blockchains.ton.encryptMnemonic(mnemonic, password);
  const publicKeyHex = bytesToHex(publicKey);

  await Promise.all([
    setAccountValue(storage, accountId, 'mnemonicsEncrypted', mnemonicEncrypted),
    setAccountValue(storage, accountId, 'publicKeys', publicKeyHex),
    setAccountValue(storage, accountId, 'addresses', address),
  ]);
}

export async function resetAccounts() {
  deactivateAllAccounts();

  await Promise.all([
    storage.removeItem('addresses'),
    storage.removeItem('publicKeys'),
    storage.removeItem('mnemonicsEncrypted'),
  ]);
  // if (IS_EXTENSION) { TODO
  //   await storage.removeItem('dapps');
  // }
}

export async function removeAccount(accountId: string) {
  deactivateAccount();
  // if (IS_EXTENSION) { TODO
  //   deactivateAccountDapp(accountId);
  // }

  await Promise.all([
    removeAccountValue(storage, accountId, 'addresses'),
    removeAccountValue(storage, accountId, 'publicKeys'),
    removeAccountValue(storage, accountId, 'mnemonicsEncrypted'),
  ]);
  // if (IS_EXTENSION) { TODO
  //   await removeAccountValue(storage, accountId, 'dapps');
  // }
}
