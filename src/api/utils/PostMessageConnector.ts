import nodejs from 'nodejs-mobile-react-native'
import generateIdFor from './generateIdFor'

export interface CancellableCallback {
  (
    ...args: any[]
  ): void;

  isCanceled?: boolean;
  acceptsBuffer?: boolean;
}

type InitData = {
  channel?: string;
  type: 'init';
  messageId?: string;
  name: 'init';
  args: any;
};

type CallMethodData = {
  channel?: string;
  type: 'callMethod';
  messageId?: string;
  name: string;
  args: any;
  withCallback?: boolean;
};

export type OriginMessageData = InitData | CallMethodData | {
  channel?: string;
  type: 'cancelProgress';
  messageId: string;
};

export interface OriginMessageEvent {
  data: OriginMessageData;
}

export type ApiUpdate =
  { type: string }
  & any;

export type WorkerMessageData = {
  channel?: string;
  type: 'update';
  update: ApiUpdate;
} | {
  channel?: string;
  type: 'methodResponse';
  messageId: string;
  response?: any;
  error?: { message: string };
} | {
  channel?: string;
  type: 'methodCallback';
  messageId: string;
  callbackArgs: any[];
} | {
  channel?: string;
  type: 'unhandledError';
  error?: { message: string };
};

export interface WorkerMessageEvent {
  data: WorkerMessageData;
}

interface RequestStates {
  messageId: string;
  resolve: Function;
  reject: Function;
  callback: AnyToVoidFunction;
}

export class Connector {
  private requestStates = new Map<string, RequestStates>();

  private requestStatesByCallback = new Map<AnyToVoidFunction, RequestStates>();

  constructor(
    public target: { postMessage: (data: any, origin?: any) => void },
    private onUpdate?: (update: ApiUpdate) => void,
    private channel?: string,
    private targetOrigin = '*',
  ) {
  }

  // eslint-disable-next-line class-methods-use-this
  public destroy() {
  }

  init(...args: any[]) {
    this.postMessage({
      type: 'init',
      args,
    });
  }

  request(messageData: { name: string; args: any }) {
    const { requestStates, requestStatesByCallback } = this;

    const messageId = generateIdFor(requestStates);
    const payload: CallMethodData = {
      type: 'callMethod',
      messageId,
      ...messageData,
    };

    const requestState = { messageId } as RequestStates;

    // Re-wrap type because of `postMessage`
    const promise: Promise<any> = new Promise((resolve, reject) => {
      Object.assign(requestState, { resolve, reject });
    });

    if (typeof payload.args[payload.args.length - 1] === 'function') {
      payload.withCallback = true;

      const callback = payload.args.pop() as AnyToVoidFunction;
      requestState.callback = callback;
      requestStatesByCallback.set(callback, requestState);
    }

    requestStates.set(messageId, requestState);
    promise
      .catch(() => undefined)
      .finally(() => {
        requestStates.delete(messageId);

        if (requestState.callback) {
          requestStatesByCallback.delete(requestState.callback);
        }
      });

    this.postMessage(payload);

    return promise;
  }

  cancelCallback(progressCallback: CancellableCallback) {
    progressCallback.isCanceled = true;

    const { messageId } = this.requestStatesByCallback.get(progressCallback) || {};
    if (!messageId) {
      return;
    }

    this.postMessage({
      type: 'cancelProgress',
      messageId,
    });
  }

  onMessage(data: WorkerMessageData) {
    const { requestStates, channel } = this;

    if (data.channel !== channel) {
      return;
    }

    if (data.type === 'update' && this.onUpdate) {
      this.onUpdate(data.update);
    }
    if (data.type === 'methodResponse') {
      const requestState = requestStates.get(data.messageId);
      if (requestState) {
        if (data.error) {
          requestState.reject(data.error);
        } else {
          requestState.resolve(data.response);
        }
      }
    } else if (data.type === 'methodCallback') {
      const requestState = requestStates.get(data.messageId);
      requestState?.callback?.(...data.callbackArgs);
    } else if (data.type === 'unhandledError') {
      throw new Error(data.error?.message);
    }
  }

  private postMessage(data: AnyLiteral) {
    data.channel = this.channel;

    if (this.target === window) {
      this.target.postMessage(data, this.targetOrigin);
    } else {
      this.target.postMessage(data);
    }
  }
}

export function createNodeJSConnector(
  onUpdate?: (update: ApiUpdate) => void,
  channel?: string,
  targetOrigin?: string,
) {
  const target = {
    postMessage: (data: any) => {
      nodejs.channel.send(data)
    }
  }
  const connector = new Connector(target, onUpdate, channel, targetOrigin);

  function handleMessage(data: WorkerMessageData) {
    connector.onMessage(data)
  }

  nodejs.channel.addListener('message', handleMessage);

  connector.destroy = () => {
    nodejs.channel.removeListener('message', handleMessage);
  };

  return connector;
}
