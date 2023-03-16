import nodejs from 'nodejs-mobile-react-native'

import type { ApiInitArgs, OnApiUpdate } from '../../types'
import type { Methods, MethodArgs, MethodResponse } from '../../methods/types'

import { Connector, createNodeJSConnector } from '../../utils/PostMessageConnector'


let connector: Connector;

export function initApi(onUpdate: OnApiUpdate, initArgs: ApiInitArgs | (() => ApiInitArgs)) {
  nodejs.start('main.js')
  if (!connector) {
    connector = createNodeJSConnector(onUpdate)
  }

  const args = typeof initArgs === 'function' ? initArgs() : initArgs;
  return connector.init(args);
}

export function callApi<T extends keyof Methods>(fnName: T, ...args: MethodArgs<T>) {
  const promise = connector.request({
    name: fnName,
    args,
  })

  return promise as MethodResponse<T>
}
