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
import { useRefresh } from './useRefresh';

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
    oldObserver = options.observers?.[propsKeys];

  registerLifecyle(lifecycleStore, options);

  // ???????????? properties ??????????????????
  // setup ?????????????????????????????????
  if (propsKeys) {
    (options.observers || (options.observers = {}))[propsKeys] = function (
      this: any,
      ...args: any[]
    ) {
      oldObserver?.call(this, ...args);

      // setup ???????????????
      this.$$updateData?.();
    };
  }

  /**
   * ????????? attached ????????? setup???????????????
   * ?????????????????? properties ????????????
   */
  (options.lifetimes || (options.lifetimes = {})).attached = function (
    this: WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>
  ) {
    const props = {} as TProperty;

    originLifetimes['attached']?.call(this);
    setCurrentInstance(this);
    registerOldLifecycle(originLifetimes);
    setUpdateData(() => {
      // ???????????? function ??????????????? Promise
      if (!isFunction(getData)) return;
      const data = (getData as any)();
      forEachObj(data, (v, key) => {
        if (isFunction(v)) {
          delete data[key];
        }
      });
      // this ??????????????????
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
              console.warn(`props ??????????????????????????? key ??? ${key as string} ?????????`);
            }
          },
        });
      });
    }

    let getData = options.setup!(props as any, getContext(this));
    if (isFunction(getData)) {
      common.call(this);
    } else if ((getData as any).then) {
      (getData as any).then((res: any) => {
        getData = res;
        common.call(this);
      });
    } else {
      if (__DEV__) throw `setup ????????????????????????`;
    }

    function common(this: any) {
      registerDataAndMethod(this, (getData as any)());
      resetUpdateData();

      // ???????????????????????????????????????????????????
      // ?????????????????? setup ?????????????????????????????? detached ??????????????????
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
    Object.defineProperty(result, key, {
      get() {
        return instance[key];
      },
      set() {
        __DEV__ && console.warn(`context ???????????????????????????`);
      },
    });
  }

  return result;
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
      // this ??????????????????
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
      // ???????????????????????? useRefresh???
      // ???????????????????????????????????? useRefresh ????????????
      componentInstance[key] = useRefresh(v);
    } else {
      data[key] = v;
    }
  });
  componentInstance.setData(data);
};
