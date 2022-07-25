import { useRefresh } from './useRefresh';

const originThen = Promise.prototype.then as any;
const originCatch = Promise.prototype.catch;
const originFinally = Promise.prototype.finally;

if (!originThen.$$isRewritten) {
  // Promise
  Promise.prototype.then = function (onFulfilled, onRejected) {
    return originThen.call(this, useRefresh(onFulfilled), useRefresh(onRejected));
  };
  Promise.prototype.catch = function (onRejected) {
    return originCatch.call(this, useRefresh(onRejected));
  };
  Promise.prototype.finally = function (onFinally) {
    return originFinally.call(this, useRefresh(onFinally));
  };

  // Timer
  const originSetTimeout = setTimeout;
  //@ts-ignore
  setTimeout = function (this: any, fn: any, ...args: any[]) {
    return originSetTimeout.call(this, useRefresh(fn)!, ...args);
  };
  // TODO: setInterval 好像是基于 setTimeout 实现的？所以只需要替换 setTimeout 即可。

  //@ts-ignore
  Promise.prototype.then.$$isRewritten = true;
}
