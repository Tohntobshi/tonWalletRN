import * as methods from './index';

export type Methods = typeof methods;
export type MethodArgs<N extends keyof Methods> = Parameters<Methods[N]>;
export type MethodResponse<N extends keyof Methods> = ReturnType<Methods[N]>;
export type MethodResponseUnwrapped<N extends keyof Methods> = UnwrapPromise<MethodResponse<N>>
