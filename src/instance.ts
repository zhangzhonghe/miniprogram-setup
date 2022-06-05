let currentInstance: any = null;

export const getCurrentInstance = () => currentInstance;
export const setCurrentInstance = (instance: any) => (currentInstance = instance);
