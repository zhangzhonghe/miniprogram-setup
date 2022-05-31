export declare const refresh: (updateData: () => void) => void;
export declare const useRefresh: (handler: (...params: any) => any) => (...p: any) => void;
export declare const nextTick: (handler?: (() => void) | undefined) => Promise<void>;
