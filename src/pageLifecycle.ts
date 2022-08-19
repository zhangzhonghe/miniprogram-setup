import { getCurrentPage } from './instance';
import { forEachObj } from './shared';
import { useAutoUpdate } from './useAutoUpdate';

export enum PageLifecycle {
  onPageLoad = 'onLoad',
  onPageShow = 'onShow',
  onPageHide = 'onHide',
  onPageReady = 'onReady',
  onPageUnload = 'onUnload',
  onPageResize = 'onResize',
  onPageScroll = 'onPageScroll',
  onPullDownRefresh = 'onPullDownRefresh',
  onReachBottom = 'onReachBottom',
  onTabItemTap = 'onTabItemTap',
  onSaveExitState = 'onSaveExitState',
}

/** 生命周期回调—监听页面显示 */
export const onPageShow = (handler: () => void) => registerPageLifecyle(PageLifecycle.onPageShow, handler);

/** 生命周期回调—监听页面隐藏 */
export const onPageHide = (handler: () => void) => registerPageLifecyle(PageLifecycle.onPageHide, handler);

/** 生命周期回调—监听页面初次渲染完成 */
export const onPageReady = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onPageReady, handler);

/** 生命周期回调—监听页面卸载 */
export const onPageUnload = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onPageUnload, handler);

/** 页面尺寸改变时触发 */
export const onPageResize = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onPageResize, handler);

/** 页面滚动触发事件的处理函数 */
export const onPageScroll = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onPageScroll, handler);

/** 监听用户下拉动作 */
export const onPullDownRefresh = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onPullDownRefresh, handler);

/** 页面上拉触底事件的处理函数 */
export const onReachBottom = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onReachBottom, handler);

/** 当前是 tab 页时，点击 tab 时触发 */
export const onTabItemTap = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onTabItemTap, handler);

/** 页面销毁前保留状态回调 */
export const onSaveExitState = (handler: () => void) =>
  registerPageLifecyle(PageLifecycle.onSaveExitState, handler);

type Fn = (...args: any[]) => void;

export interface LifecycleStore {
  onShow: Map<any, Fn[]>;
  onHide: Map<any, Fn[]>;
  onReady: Map<any, Fn[]>;
  onUnload: Map<any, Fn[]>;
  onPullDownRefresh: Map<any, Fn[]>;
  onReachBottom: Map<any, Fn[]>;
  onPageScroll: Map<any, Fn[]>;
  onResize: Map<any, Fn[]>;
  onTabItemTap: Map<any, Fn[]>;
  onSaveExitState: Map<any, Fn[]>;
}

let lifecycleStore: LifecycleStore | null = null;

export const getLifecycleStore = (): LifecycleStore =>
  lifecycleStore ||
  (lifecycleStore = {
    onShow: new Map(),
    onHide: new Map(),
    onReady: new Map(),
    onUnload: new Map(),
    onPullDownRefresh: new Map(),
    onReachBottom: new Map(),
    onPageScroll: new Map(),
    onResize: new Map(),
    onTabItemTap: new Map(),
    onSaveExitState: new Map(),
  });

export const emptyLifecycleStore = (instance: any) => {
  if (lifecycleStore) {
    forEachObj(lifecycleStore, (map: Map<any, any>) => {
      map.delete(instance);
    });
  }
};

export const registerPageLifecyle = (
  type: keyof LifecycleStore,
  handler: (...args: any[]) => void
) => {
  const map = lifecycleStore?.[type];
  if (map) {
    let list: any;
    if ((list = map.get(getCurrentPage()))) {
      list.push(useAutoUpdate(handler));
    } else {
      list = [];
      map.set(getCurrentPage(), list);
      list.push(useAutoUpdate(handler));
    }
  }
};
