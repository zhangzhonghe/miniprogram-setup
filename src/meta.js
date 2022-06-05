import { useRefresh } from './useRefresh';

const originThen = Promise.prototype.then;

if (!originThen.$$isRewritten) {
  Promise.prototype.then = function (onFulfilled, onRejected) {
    function proxy(...args) {
      if (onFulfilled) {
        return onFulfilled.call(this, ...args);
      }
    }
    return originThen.call(this, useRefresh(proxy), onRejected);
  };

  Promise.prototype.then.$$isRewritten = true;
}
