let updateData = null;
const getUpdateData = () => updateData;
const setUpdateData = (value) => (updateData = value);
const resetUpdateData = () => (updateData = null);

const refresh = (updateData) => {
    if (updateData.isRefreshing) {
        return;
    }
    updateData.isRefreshing = true;
    nextTick(() => {
        updateData();
        updateData.isRefreshing = false;
    });
};
const useRefresh = (handler) => {
    const updateData = getUpdateData();
    return function (...p) {
        if (updateData) {
            refresh(updateData);
            // 当使用 await 的时候，其之后的代码
            // 运行的时候 updateData 的值可能已经
            // 被改变，所以在此重新设置回相应的值。
            setUpdateData(updateData);
        }
        // 确保 this 指向不变
        return handler.call(this, ...p);
    };
};
const nextTick = (handler) => {
    return Promise.resolve().then(handler);
};

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

let currentInstance = null;
const getCurrentInstance = () => currentInstance;
const setCurrentInstance = (instance) => (currentInstance = instance);

const isFunction = (v) => typeof v === 'function';
const forEachObj = (obj, handler) => {
    Object.keys(obj).forEach((key) => {
        handler(obj[key], key);
    });
};

let lifecycleStore = null;
/**
 * 在组件在视图层布局完成后执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
const onReady = (handler) => registerComponentLifecyle('ready', handler);
/**
 * 在组件实例被移动到节点树另一个位置时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
const onMoved = (handler) => registerComponentLifecyle('moved', handler);
/**
 * 在组件实例被从页面节点树移除时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
const onDetached = (handler) => registerComponentLifecyle('detached', handler);
/**
 * 每当组件方法抛出错误时执行
 *
 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
const onError = (handler) => registerComponentLifecyle('error', handler);
const initLifecycleStore = () => (lifecycleStore = {
    ready: new Map(),
    moved: new Map(),
    detached: new Map(),
    error: new Map(),
});
const emptyLifecycleStore = (instance) => {
    if (lifecycleStore) {
        forEachObj(lifecycleStore, (map) => {
            map.delete(instance);
        });
    }
};
const registerComponentLifecyle = (type, handler) => {
    const map = lifecycleStore === null || lifecycleStore === void 0 ? void 0 : lifecycleStore[type];
    if (map) {
        let list;
        if ((list = map.get(getCurrentInstance()))) {
            list.push(handler);
        }
        else {
            list = [];
            map.set(getCurrentInstance(), list);
            list.push(handler);
        }
    }
};

const ComponentWithSetup = (options) => {
    if (options.setup) {
        runComponentSetup(options);
    }
    return Component(options);
};
const runComponentSetup = (options) => {
    const lifecycleStore = initLifecycleStore(), originLifetimes = getOldLifetimes(options);
    registerLifecyle(lifecycleStore, options);
    /**
     * 在组件 attached 时运行 setup，因为只有
     * 此时才能获取 properties 中的值。
     */
    (options.lifetimes || (options.lifetimes = {})).attached = function () {
        var _a;
        const props = {};
        (_a = originLifetimes['attached']) === null || _a === void 0 ? void 0 : _a.call(this);
        setCurrentInstance(this);
        registerOldLifecycle(originLifetimes);
        setUpdateData(() => {
            // 如果不是 function 说明是一个 Promise
            if (!isFunction(getData))
                return;
            const data = getData();
            forEachObj(data, (v, key) => {
                if (isFunction(v)) {
                    delete data[key];
                }
            });
            // this 指向组件示例
            this.setData(data);
        });
        if (options.properties) {
            forEachObj(options.properties, (v, key) => {
                Object.defineProperty(props, key, {
                    get: () => {
                        return this.data[key];
                    },
                    set() {
                        {
                            console.warn(`props 是只读的，无法修改 key 为 ${key} 的值。`);
                        }
                    },
                });
            });
        }
        let getData = options.setup(props);
        if (isFunction(getData)) {
            common.call(this);
        }
        else if (getData.then) {
            getData.then((res) => {
                getData = res;
                common.call(this);
            });
        }
        else {
            throw `setup 必须返回一个函数`;
        }
        function common() {
            registerDataAndMethod(this, getData());
            resetUpdateData();
            // 组件销毁时清空已注册的生命周期函数
            // 注意：需放在 setup 之后，不然其它注册的 detached 函数不会执行
            onDetached(() => emptyLifecycleStore(this));
        }
    };
};
const registerLifecyle = (lifecycleStore, options) => {
    const lifetimes = (options.lifetimes = options.lifetimes || {});
    forEachObj(lifecycleStore, (handlerSet, key) => {
        lifetimes[key] = function (...args) {
            var _a;
            // this 指向组件实例
            (_a = handlerSet.get(this)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => handler(...args));
        };
    });
};
const registerOldLifecycle = (lifetimes) => {
    forEachObj(lifetimes, (handler, key) => {
        if (key === 'attached')
            return;
        key === 'ready' && onReady(handler);
        key === 'moved' && onMoved(handler);
        key === 'detached' && onDetached(handler);
        key === 'error' && onError(handler);
    });
};
const getOldLifetimes = (options) => {
    const lifetimes = (options.lifetimes = options.lifetimes || {}), result = {};
    forEachObj(lifetimes, (handler, key) => {
        result[key] = handler;
    });
    return result;
};
const registerDataAndMethod = (componentInstance, dataAndMethod) => {
    const data = {};
    forEachObj(dataAndMethod, (v, key) => {
        if (isFunction(v)) {
            // 用户不需手动使用 useRefresh，
            // 终极目标是用户可以不知道 useRefresh 的存在。
            componentInstance[key] = useRefresh(v);
        }
        else {
            data[key] = v;
        }
    });
    componentInstance.setData(data);
};

export { ComponentWithSetup, onDetached, onError, onMoved, onReady };
