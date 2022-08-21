export declare const refresh: (updateData: (() => void) & {
    isRefreshing?: boolean;
}) => void;
export declare const useAutoUpdate: (handler?: ((...params: any) => any) | null | undefined) => ((this: any, ...args: any) => any) | undefined;
export declare function nextTick(handler?: () => void): Promise<void>;
