let currentInstance: any = null,
  pageInstance: any = null;

export const getCurrentInstance = () => currentInstance;
export const setCurrentInstance = (instance: any) => (currentInstance = instance);

export const getCurrentPage = () => {
  if (__TEST__) {
    return pageInstance;
  }
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};
export const setCurrentPage = (page: any) => (pageInstance = page);
