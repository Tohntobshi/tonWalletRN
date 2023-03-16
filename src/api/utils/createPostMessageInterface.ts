import rnBridge from 'rn-bridge'
import type {
  CancellableCallback, OriginMessageData, WorkerMessageData, ApiUpdate,
} from './PostMessageConnector'

const callbackState = new Map<string, CancellableCallback>();

type ApiConfig =
  ((name: string, ...args: any[]) => any | [any, ArrayBuffer[]])
  | Record<string, Function>;
type SendToOrigin = (data: WorkerMessageData, transferables?: any[]) => void;


export function createNodeJSInterface(api: ApiConfig, channel?: string) {
  function sendToOrigin(data: WorkerMessageData, transferables?: any[]) {
    data.channel = channel

    // TODO
    // if (transferables) {
    //   postMessage(data, transferables);
    // } else {
    //   postMessage(data);
    // }
    postMessage(data)
  }

  // TODO
  // handleErrors(sendToOrigin)

  rnBridge.channel.on('message', (data: OriginMessageData) => {
    if (data?.channel === channel) {
      onMessage(api, data, sendToOrigin);
    }
  })
}

function postMessage(data: any) {
  rnBridge.channel.send(data)
}

async function onMessage(
  api: ApiConfig,
  data: OriginMessageData,
  sendToOrigin: SendToOrigin,
  onUpdate?: (update: ApiUpdate) => void,
  origin?: string,
) {
  if (!onUpdate) {
    onUpdate = (update: ApiUpdate) => {
      sendToOrigin({
        type: 'update',
        update,
      });
    };
  }

  switch (data.type) {
    case 'init': {
      const { args } = data;
      const promise = typeof api === 'function'
        ? api('init', origin, onUpdate, ...args)
        : api.init?.(origin, onUpdate, ...args);
      await promise;

      break;
    }
    case 'callMethod': {
      const {
        messageId, name, args, withCallback,
      } = data;
      try {
        if (messageId && withCallback) {
          const callback = (...callbackArgs: any[]) => {
            const lastArg = callbackArgs[callbackArgs.length - 1];

            sendToOrigin({
              type: 'methodCallback',
              messageId,
              callbackArgs,
            }, isTransferable(lastArg) ? [lastArg] : undefined);
          };

          callbackState.set(messageId, callback);

          args.push(callback as never);
        }

        const response = typeof api === 'function'
          ? await api(name, origin, ...args)
          : await api[name](origin, ...args);
        const { arrayBuffer } = (typeof response === 'object' && 'arrayBuffer' in response && response) || {};

        if (messageId) {
          sendToOrigin(
            {
              type: 'methodResponse',
              messageId,
              response,
            },
            arrayBuffer ? [arrayBuffer] : undefined,
          );
        }
      } catch (error: any) {

        if (messageId) {
          sendToOrigin({
            type: 'methodResponse',
            messageId,
            error: { message: error.message },
          });
        }
      }

      if (messageId) {
        callbackState.delete(messageId);
      }

      break;
    }
    case 'cancelProgress': {
      const callback = callbackState.get(data.messageId);
      if (callback) {
        callback.isCanceled = true;
      }

      break;
    }
  }
}

function isTransferable(obj: any) {
  return obj instanceof ArrayBuffer || obj instanceof ImageBitmap;
}

// TODO
// function handleErrors(sendToOrigin: SendToOrigin) {
//   self.onerror = (e: any) => {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     sendToOrigin({ type: 'unhandledError', error: { message: e.error.message || 'Uncaught exception in worker' } });
//   };

//   self.addEventListener('unhandledrejection', (e: any) => {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     sendToOrigin({ type: 'unhandledError', error: { message: e.reason.message || 'Uncaught rejection in worker' } });
//   });
// }
