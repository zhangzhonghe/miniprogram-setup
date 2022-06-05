import { getCurrentInstance } from './instance';
import { forEachObj } from './shared';

type Fn = (...args: any[]) => void;

export interface LifecycleStore {
  ready: Map<any, Fn[]>;
  moved: Map<any, Fn[]>;
  detached: Map<any, Fn[]>;
  error: Map<any, Fn[]>;
}

let lifecycleStore: LifecycleStore | null = null;

/**
 * 在组件在视图层布局完成后执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onReady = (handler: () => void) => registerComponentLifecyle('ready', handler);

/**
 * 在组件实例被移动到节点树另一个位置时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onMoved = (handler: () => void) => registerComponentLifecyle('moved', handler);

/**
 * 在组件实例被从页面节点树移除时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onDetached = (handler: () => void) => registerComponentLifecyle('detached', handler);

/**
 * 每当组件方法抛出错误时执行
 *
 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onError = (handler: (err: Error) => void) =>
  registerComponentLifecyle('error', handler);

export const initLifecycleStore = (): LifecycleStore =>
  (lifecycleStore = {
    ready: new Map(),
    moved: new Map(),
    detached: new Map(),
    error: new Map(),
  });

export const emptyLifecycleStore = (instance: any) => {
  if (lifecycleStore) {
    forEachObj(lifecycleStore, (map: Map<any, any>) => {
      map.delete(instance);
    });
  }
};

export const registerComponentLifecyle = (
  type: keyof LifecycleStore,
  handler: (...args: any[]) => void
) => {
  const map = lifecycleStore?.[type];
  if (map) {
    let list: any;
    if ((list = map.get(getCurrentInstance()))) {
      list.push(handler);
    } else {
      list = [];
      map.set(getCurrentInstance(), list);
      list.push(handler);
    }
  }
};
