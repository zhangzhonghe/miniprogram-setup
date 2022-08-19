export const NOOP = () => {}

export const isFunction = (v: unknown) => typeof v === 'function'

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const forEachObj = <T extends Record<string, any>>(
  obj: T,
  handler: (value: any, key: keyof T) => void,
) => {
  Object.keys(obj).forEach((key) => {
    handler(obj[key], key)
  })
}
