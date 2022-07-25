export declare const refresh: (updateData: (() => void) & {
    isRefreshing?: boolean;
}) => void;
export declare const useRefresh: (handler?: ((...params: any) => any) | null | undefined) => ((this: any, ...args: any) => any) | undefined;
export declare const nextTick: (handler?: () => void) => Promise<void>;
