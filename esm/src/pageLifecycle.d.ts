export declare enum PageLifecycle {
    onPageLoad = "onLoad",
    onPageShow = "onShow",
    onPageHide = "onHide",
    onPageReady = "onReady",
    onPageUnload = "onUnload",
    onPageResize = "onResize",
    onPageScroll = "onPageScroll",
    onPullDownRefresh = "onPullDownRefresh",
    onReachBottom = "onReachBottom",
    onTabItemTap = "onTabItemTap",
    onSaveExitState = "onSaveExitState"
}
/** 生命周期回调—监听页面显示 */
export declare const onPageShow: (handler: () => void) => void;
/** 生命周期回调—监听页面隐藏 */
export declare const onPageHide: (handler: () => void) => void;
/** 生命周期回调—监听页面初次渲染完成 */
export declare const onPageReady: (handler: () => void) => void;
/** 生命周期回调—监听页面卸载 */
export declare const onPageUnload: (handler: () => void) => void;
/** 页面尺寸改变时触发 */
export declare const onPageResize: (handler: () => void) => void;
/** 页面滚动触发事件的处理函数 */
export declare const onPageScroll: (handler: () => void) => void;
/** 监听用户下拉动作 */
export declare const onPullDownRefresh: (handler: () => void) => void;
/** 页面上拉触底事件的处理函数 */
export declare const onReachBottom: (handler: () => void) => void;
/** 当前是 tab 页时，点击 tab 时触发 */
export declare const onTabItemTap: (handler: () => void) => void;
/** 页面销毁前保留状态回调 */
export declare const onSaveExitState: (handler: () => void) => void;
declare type Fn = (...args: any[]) => void;
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
export declare const getLifecycleStore: () => LifecycleStore;
export declare const emptyLifecycleStore: (instance: any) => void;
export declare function registerPageLifecyle(type: keyof LifecycleStore, handler: (...args: any[]) => void): void;
export {};
