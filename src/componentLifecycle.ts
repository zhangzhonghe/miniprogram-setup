type Fn = (...args: any[]) => void;

export interface LifecycleStore {
  created?: Fn[];
  attached?: Fn[];
  ready?: Fn[];
  moved?: Fn[];
  detached?: Fn[];
  error?: Fn[];
}

let lifecycleStore: LifecycleStore | null = null;

/**
 * 在组件实例刚刚被创建时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onCreated = (handler: () => void) => registerComponentLifecyle('created', handler);

/**
 * 在组件实例进入页面节点树时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onAttached = (handler: () => void) => registerComponentLifecyle('attached', handler);

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

export const initLifecycleStore = (): LifecycleStore => (lifecycleStore = {});

export const registerComponentLifecyle = (
  type: keyof LifecycleStore,
  handler: (...args: any[]) => void
) => {
  if (lifecycleStore) {
    (lifecycleStore[type] || (lifecycleStore[type] = [])).push(handler);
  }
};
