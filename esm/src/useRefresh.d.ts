export declare const refresh: (updateData: (() => void) & {
    isRefreshing?: boolean;
}) => void;
export declare const useRefresh: (handler: (...params: any) => any) => (this: any, ...p: any) => any;
export declare const nextTick: (handler?: (() => void) | undefined) => Promise<void>;
