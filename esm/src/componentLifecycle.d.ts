declare type Fn = (...args: any[]) => void;
export interface LifecycleStore {
    ready: Map<any, Fn[]>;
    moved: Map<any, Fn[]>;
    detached: Map<any, Fn[]>;
    error: Map<any, Fn[]>;
}
/**
 * 在组件在视图层布局完成后执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export declare const onReady: (handler: () => void) => void;
/**
 * 在组件实例被移动到节点树另一个位置时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export declare const onMoved: (handler: () => void) => void;
/**
 * 在组件实例被从页面节点树移除时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export declare const onDetached: (handler: () => void) => void;
/**
 * 每当组件方法抛出错误时执行
 *
 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export declare const onError: (handler: (err: Error) => void) => void;
export declare const initLifecycleStore: () => LifecycleStore;
export declare const emptyLifecycleStore: (instance: any) => void;
export declare const registerComponentLifecyle: (type: keyof LifecycleStore, handler: (...args: any[]) => void) => void;
export {};
