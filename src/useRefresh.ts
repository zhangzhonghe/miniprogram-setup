import { getUpdateData } from './updateData';

const awaiting = new Map<() => void, true>();

export const refresh = (updateData: () => void) => {
  if (awaiting.get(updateData)) {
    return;
  }
  awaiting.set(updateData, true);
  nextTick(() => {
    awaiting.delete(updateData);
    updateData();
  });
};

export const useRefresh = (handler: (...params: any) => any) => {
  const updateData = getUpdateData();
  return (...p: any) => {
    handler(...p);
    refresh(updateData);
  };
};

export const nextTick = (handler?: () => void) => {
  return Promise.resolve().then(handler);
};
