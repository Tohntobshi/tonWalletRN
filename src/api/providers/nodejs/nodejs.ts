import type { ApiInitArgs, OnApiUpdate } from '../../types'
import { createNodeJSInterface } from '../../utils/createPostMessageInterface'
import { StorageType } from '../../storages/types'
import * as methods from '../../methods'


createNodeJSInterface((name: string, origin?: string, ...args: any[]) => {
    if (name === 'init') {
        return methods.init(args[0] as OnApiUpdate, args[1] as ApiInitArgs, StorageType.FileStorage);
    } else {
        const method = (methods as any)[name];

        return method(...args);
    }
});
