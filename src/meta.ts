import { forEachObj, isFunction, isObject } from './shared';
import { useAutoUpdate } from './useAutoUpdate';

const originThen = Promise.prototype.then as any;
const originCatch = Promise.prototype.catch;
const originFinally = Promise.prototype.finally;
const originWx = wx;

if (!originThen.$$isRewritten) {
  // Promise
  Promise.prototype.then = function (onFulfilled, onRejected) {
    return originThen.call(this, useAutoUpdate(onFulfilled), useAutoUpdate(onRejected));
  };
  Promise.prototype.catch = function (onRejected) {
    return originCatch.call(this, useAutoUpdate(onRejected));
  };
  Promise.prototype.finally = function (onFinally) {
    return originFinally.call(this, useAutoUpdate(onFinally));
  };

  // Timer
  const originSetTimeout = setTimeout;
  //@ts-ignore
  setTimeout = function (this: any, fn: any, ...args: any[]) {
    return originSetTimeout.call(this, useAutoUpdate(fn)!, ...args);
  };
  // TODO: setInterval 好像是基于 setTimeout 实现的？所以只需要替换 setTimeout 即可。

  // 小程序 API
  rewriteMiniProgramAPI();

  //@ts-ignore
  Promise.prototype.then.$$isRewritten = true;
}

/**
 * 为了解决调用小程序 API 中 success/fail/complete
 * 回调函数时，不更新视图的问题。
 */
function rewriteMiniProgramAPI() {
  const result = {} as WechatMiniprogram.Wx;

  forEachObj(originWx, (value, key) => {
    if (isFunction(value)) {
      result[key] = function (
        this: any,
        options?: { success?: any; fail?: any; complete?: any },
        ...args: any[]
      ) {
        if (isObject(options)) {
          const { success, fail, complete } = options;
          success && (options.success = useAutoUpdate(success));
          fail && (options.fail = useAutoUpdate(fail));
          complete && (options.complete = useAutoUpdate(complete));
        }
        return value.call(this, options, ...args);
      } as any;
    } else {
      result[key] = value;
    }
  });

  wx = Object.freeze(result);
}
