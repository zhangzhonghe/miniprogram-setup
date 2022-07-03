import { useRefresh } from './useRefresh';

const originThen = Promise.prototype.then;

if (!originThen.$$isRewritten) {
  Promise.prototype.then = function (onFulfilled, onRejected) {
    return originThen.call(this, useRefresh(onFulfilled), useRefresh(onRejected));
  };

  Promise.prototype.then.$$isRewritten = true;
}
