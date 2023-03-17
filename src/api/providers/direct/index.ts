import type { ApiInitArgs, OnApiUpdate } from '../../types';
import type { Methods, MethodArgs, MethodResponse } from '../../methods/types';

import asyncStorage from '../../storages/asyncStorage'
import * as methods from '../../methods'


export function initApi(onUpdate: OnApiUpdate, initArgs: ApiInitArgs | (() => ApiInitArgs)) {
  const args = typeof initArgs === 'function' ? initArgs() : initArgs
  methods.init(onUpdate, args, asyncStorage)
}

export function callApi<T extends keyof Methods>(fnName: T, ...args: MethodArgs<T>): MethodResponse<T> {
  // @ts-ignore
  return methods[fnName](...args) as MethodResponse<T>
}
