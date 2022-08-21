export declare const NOOP: () => void;
export declare const isFunction: (v: unknown) => boolean;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const forEachObj: <T extends Record<string, any>>(obj: T, handler: (value: any, key: keyof T) => void) => void;
