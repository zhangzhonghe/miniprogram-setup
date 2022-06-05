import { getUpdateData, setUpdateData } from './updateData';

export const refresh = (updateData: (() => void) & { isRefreshing?: boolean }) => {
  if (updateData.isRefreshing) {
    return;
  }
  updateData.isRefreshing = true;
  nextTick(() => {
    updateData();
    updateData.isRefreshing = false;
  });
};

export const useRefresh = (handler: (...params: any) => any) => {
  const updateData = getUpdateData();
  return function (this: any, ...p: any) {
    if (updateData) {
      refresh(updateData);
      // 当使用 await 的时候，其之后的代码
      // 运行的时候 updateData 的值可能已经
      // 被改变，所以在此重新设置回相应的值。
      setUpdateData(updateData);
    }

    // 确保 this 指向不变
    return handler.call(this, ...p);
  };
};

export const nextTick = (handler?: () => void) => {
  return Promise.resolve().then(handler);
};
