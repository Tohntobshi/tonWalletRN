// import './polyfill'
import type { ApiInitArgs, OnApiUpdate } from '../../types'
import { createNodeJSInterface } from '../../utils/createPostMessageInterface'
import fileStorage, { initFileStorage } from '../../storages/fileStorage'
import init from '../../methods/init'
import * as methods from '../../methods'


createNodeJSInterface(async (name: string, origin?: string, ...args: any[]) => {
    if (name === 'init') {
        await initFileStorage()
        return init(args[0] as OnApiUpdate, args[1] as ApiInitArgs, fileStorage)
    } else {
        const method = (methods as any)[name]

        return method(...args)
    }
})
