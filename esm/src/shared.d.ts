export declare const NOOP: () => void;
export declare const isFunction: (v: any) => boolean;
export declare const forEachObj: <T extends Record<string, any>>(obj: T, handler: (value: any, key: keyof T) => void) => void;
