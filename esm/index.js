let lifecycleStore = null;
/**
 * 在组件实例进入页面节点树时执行
 *
 * 最低基础库版本：[`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
const onAttached = (handler) => registerComponentLifecyle('attached', handler);
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
    attached: [],
    ready: [],
    moved: [],
    detached: [],
    error: [],
});
const registerComponentLifecyle = (type, handler) => {
    if (lifecycleStore) {
        (lifecycleStore[type] || (lifecycleStore[type] = [])).push(handler);
    }
};

const NOOP = () => { };
const isFunction = (v) => typeof v === 'function';
const forEachObj = (obj, handler) => {
    Object.keys(obj).forEach((key) => {
        handler(obj[key], key);
    });
};

let updateData = NOOP;
const getUpdateData = () => updateData;
const setUpdateData = (value) => (updateData = value);

const awaiting = new Map();
const refresh = (updateData) => {
    if (awaiting.get(updateData)) {
        return;
    }
    awaiting.set(updateData, true);
    nextTick(() => {
        awaiting.delete(updateData);
        updateData();
    });
};
const useRefresh = (handler) => {
    const updateData = getUpdateData();
    return (...p) => {
        handler(...p);
        refresh(updateData);
    };
};
const nextTick = (handler) => {
    return Promise.resolve().then(handler);
};

const ComponentWithSetup = (options) => {
    if (options.setup) {
        runComponentSetup(options);
    }
    return Component(options);
};
const runComponentSetup = (options) => {
    var _a;
    const lifecycleStore = initLifecycleStore(), originCreated = ((_a = options.lifetimes) === null || _a === void 0 ? void 0 : _a['created']) || options.created;
    registerLifecyle(lifecycleStore, options);
    (options.lifetimes || (options.lifetimes = {})).created = function () {
        originCreated === null || originCreated === void 0 ? void 0 : originCreated();
        setUpdateData(() => {
            const data = getData();
            forEachObj(data, (v, key) => {
                if (isFunction(v)) {
                    delete data[key];
                }
            });
            // this 指向组件示例
            this.setData(data);
        });
        const props = {};
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
        const getData = options.setup(props);
        registerDataAndMethod(this, getData());
        // 需放在 setup 之后，不然其它注册的 detached 函数不会执行
        onDetached(() => {
            // 组件销毁时清空已注册的生命周期函数
            forEachObj(lifecycleStore, (list) => {
                list.length = 0;
            });
        });
    };
};
const registerLifecyle = (lifecycleStore, options) => {
    const lifetimes = (options.lifetimes = options.lifetimes || {});
    forEachObj(lifetimes, (handler, key) => {
        registerComponentLifecyle(key, handler);
    });
    forEachObj(lifecycleStore, (handlerSet, key) => {
        lifetimes[key] = function (...args) {
            // 保持 this 的引用指向组件示例
            handlerSet.forEach((handler) => handler.call(this, ...args));
        };
    });
};
const registerDataAndMethod = (componentInstance, dataAndMethod) => {
    const data = {};
    forEachObj(dataAndMethod, (v, key) => {
        if (isFunction(v)) {
            componentInstance[key] = v;
        }
        else {
            data[key] = v;
        }
    });
    nextTick(() => componentInstance.setData(data));
};

export { ComponentWithSetup, onAttached, onDetached, onError, onMoved, onReady, useRefresh };
