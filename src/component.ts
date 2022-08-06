import {
  emptyLifecycleStore,
  initLifecycleStore,
  LifecycleStore,
  onDetached,
  onError,
  onMoved,
  onReady,
} from './componentLifecycle';
import { setCurrentInstance } from './instance';
import { forEachObj, isFunction } from './shared';
import { getUpdateData, resetUpdateData, setUpdateData } from './updateData';
import { useAutoUpdate } from './useAutoUpdate';

type DataOption = WechatMiniprogram.Component.DataOption;
type PropertyOption = WechatMiniprogram.Component.PropertyOption;
type MethodOption = WechatMiniprogram.Component.MethodOption;

interface Setup<
  TData extends DataOption,
  TProperty extends PropertyOption,
  TMethod extends MethodOption,
  P
> {
  (
    this: void,
    data: P,
    context: Pick<
      WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>,
      | 'animate'
      | 'clearAnimation'
      | 'createIntersectionObserver'
      | 'createSelectorQuery'
      | 'dataset'
      | 'getOpenerEventChannel'
      | 'getPageId'
      | 'getRelationNodes'
      | 'getTabBar'
      | 'groupSetData'
      | 'hasBehavior'
      | 'id'
      | 'is'
      | 'selectAllComponents'
      | 'selectComponent'
      | 'selectOwnerComponent'
      | 'setUpdatePerformanceListener'
      | 'triggerEvent'
    >
  ): (() => Record<string, any>) | Promise<() => Record<string, any>>;
}

type ComponentOptions<
  TData extends DataOption,
  TProperty extends PropertyOption,
  TMethod extends MethodOption
> = WechatMiniprogram.Component.Options<TData, TProperty, TMethod> & {
  setup?: Setup<
    TData,
    TProperty,
    TMethod,
    WechatMiniprogram.Component.PropertyOptionToData<TProperty>
  >;
};

export const ComponentWithSetup = <
  TData,
  TProperty extends PropertyOption,
  TMethod extends MethodOption
>(
  options: ComponentOptions<TData, TProperty, TMethod>
) => {
  if (options.setup) {
    runComponentSetup(options);
  }
  return Component(options);
};

const runComponentSetup = <TData, TProperty extends PropertyOption, TMethod extends MethodOption>(
  options: ComponentOptions<TData, TProperty, TMethod>
) => {
  const lifecycleStore = initLifecycleStore(),
    originLifetimes = getOldLifetimes(options),
    propsKeys = getPropKey(options),
    oldObserver = options.observers?.[propsKeys],
    // 单独抽出来是为了避免通过 this 访问 options
    setup = options.setup;

  registerLifecyle(lifecycleStore, options);

  // 当组件的 properties 变更时，确保
  // setup 中的状态也能及时更新。
  if (propsKeys) {
    (options.observers || (options.observers = {}))[propsKeys] = function (
      this: any,
      ...args: any[]
    ) {
      oldObserver?.call(this, ...args);

      // setup 返回的函数
      this.$$updateData?.();
    };
  }

  /**
   * 在组件 attached 时运行 setup，因为只有
   * 此时才能获取 properties 中的值。
   */
  (options.lifetimes || (options.lifetimes = {})).attached = function (
    this: WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>
  ) {
    const props = {} as TProperty;

    originLifetimes['attached']?.call(this);
    setCurrentInstance(this);
    registerOldLifecycle(originLifetimes);
    setUpdateData(() => {
      // 如果不是 function 说明是一个 Promise
      if (!isFunction(getData)) return;
      const data = (getData as any)();
      forEachObj(data, (v, key) => {
        if (isFunction(v)) {
          delete data[key];
        }
      });
      // this 指向组件实例
      this.setData(data);
    });

    // @ts-ignore
    this.$$updateData = getUpdateData();

    if (options.properties) {
      forEachObj(options.properties, (v, key) => {
        Object.defineProperty(props, key, {
          get: () => {
            return this.data[key];
          },
          set() {
            if (__DEV__) {
              console.warn(`props 是只读的，无法修改 key 为 ${key as string} 的值。`);
            }
          },
        });
      });
    }

    let getData = setup!(props as any, getContext(this));
    if (isFunction(getData)) {
      common.call(this);
    } else if ((getData as any).then) {
      (getData as any).then((res: any) => {
        getData = res;
        common.call(this);
      });
    } else {
      if (__DEV__) throw `setup 必须返回一个函数`;
    }

    function common(this: any) {
      registerDataAndMethod(this, (getData as any)());
      resetUpdateData();

      // 组件销毁时清空已注册的生命周期函数
      // 注意：需放在 setup 之后，不然其它注册的 detached 函数不会执行
      onDetached(() => emptyLifecycleStore(this));
    }
  };
};

const getContext = (instance: any) => {
  const result: any = {},
    keys = [
      'animate',
      'clearAnimation',
      'createIntersectionObserver',
      'createSelectorQuery',
      'dataset',
      'getOpenerEventChannel',
      'getPageId',
      'getRelationNodes',
      'getTabBar',
      'groupSetData',
      'hasBehavior',
      'id',
      'is',
      'selectAllComponents',
      'selectComponent',
      'selectOwnerComponent',
      'setUpdatePerformanceListener',
      'triggerEvent',
    ];

  for (const key of keys) {
    result[key] = instance[key];
  }

  return Object.freeze(result);
};

const getPropKey = (options: any) => {
  const props = options.properties;
  if (!props) return '';
  return Object.keys(props).join(',');
};

const registerLifecyle = <TData, TProperty extends PropertyOption, TMethod extends MethodOption>(
  lifecycleStore: LifecycleStore,
  options: ComponentOptions<TData, TProperty, TMethod>
) => {
  const lifetimes = (options.lifetimes = options.lifetimes || {});
  forEachObj(lifecycleStore, (handlerSet: Map<any, any[]>, key) => {
    lifetimes[key] = function (this: any, ...args: any[]) {
      // this 指向组件实例
      handlerSet.get(this)?.forEach((handler) => handler(...args));
    };
  });
};

const registerOldLifecycle = (lifetimes: Record<string, any>) => {
  forEachObj(lifetimes, (handler, key) => {
    if (key === 'attached') return;
    key === 'ready' && onReady(handler);
    key === 'moved' && onMoved(handler);
    key === 'detached' && onDetached(handler);
    key === 'error' && onError(handler);
  });
};

const getOldLifetimes = (options: any) => {
  const lifetimes = (options.lifetimes = options.lifetimes || {}),
    result = {} as any;

  forEachObj(lifetimes, (handler, key) => {
    result[key] = handler;
  });

  return result;
};

const registerDataAndMethod = (componentInstance: any, dataAndMethod: Record<string, any>) => {
  const data: any = {};
  forEachObj(dataAndMethod, (v, key) => {
    if (isFunction(v)) {
      // 用户不需手动使用 useRefresh，
      // 终极目标是用户可以不知道 useRefresh 的存在。
      componentInstance[key] = useAutoUpdate(v);
    } else {
      data[key] = v;
    }
  });
  componentInstance.setData(data);
};
