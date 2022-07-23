import { useRefresh } from './useRefresh';

const originThen = Promise.prototype.then as any;
const originCatch = Promise.prototype.catch;
const originFinally = Promise.prototype.finally;

if (!originThen.$$isRewritten) {
  Promise.prototype.then = function (onFulfilled, onRejected) {
    return originThen.call(this, useRefresh(onFulfilled), useRefresh(onRejected));
  };
  Promise.prototype.catch = function (onRejected) {
    return originCatch.call(this, useRefresh(onRejected));
  };
  Promise.prototype.finally = function (onFinally) {
    return originFinally.call(this, useRefresh(onFinally));
  };

  //@ts-ignore
  Promise.prototype.then.$$isRewritten = true;
}
