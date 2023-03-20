declare module "rn-bridge"

type NoneToVoidFunction = () => void
type AnyToVoidFunction = (...args: any[]) => void
type AnyFunction = (...args: any[]) => any
type AnyLiteral = Record<string, any>
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T