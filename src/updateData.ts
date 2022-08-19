let updateData: ((() => void) & { isRefreshing?: boolean }) | null = null

export const getUpdateData = () => updateData
export const setUpdateData = (value: () => void) => (updateData = value)
export const resetUpdateData = () => (updateData = null)
