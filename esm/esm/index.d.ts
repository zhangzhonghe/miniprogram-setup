export function ComponentWithSetup(options: any): string;
/**
 * 在组件实例被从页面节点树移除时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export function onDetached(handler: any): void;
/**
 * 每当组件方法抛出错误时执行
 *
 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export function onError(handler: any): void;
/**
 * 在组件实例被移动到节点树另一个位置时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export function onMoved(handler: any): void;
/**
 * 在组件在视图层布局完成后执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export function onReady(handler: any): void;
