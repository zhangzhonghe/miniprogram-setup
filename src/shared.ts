export const NOOP = () => {};

export const isFunction = (v: any) => typeof v === 'function';

export const forEachObj = <T extends Record<string, any>>(
  obj: T,
  handler: (value: any, key: keyof T) => void
) => {
  Object.keys(obj).forEach((key) => {
    handler(obj[key], key);
  });
};
