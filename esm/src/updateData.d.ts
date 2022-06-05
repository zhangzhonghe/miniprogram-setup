export declare const getUpdateData: () => ((() => void) & {
    isRefreshing?: boolean | undefined;
}) | null;
export declare const setUpdateData: (value: () => void) => () => void;
export declare const resetUpdateData: () => null;
