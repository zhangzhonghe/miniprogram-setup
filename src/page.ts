import { setCurrentPage } from './instance';
import {
  LifecycleStore,
  getLifecycleStore,
  PageLifecycle,
  onPageHide,
  onPageUnload,
  onPageShow,
  onPageReady,
  onPageScroll,
  onReachBottom,
  onTabItemTap,
  onPullDownRefresh,
  onSaveExitState,
  onPageResize,
  emptyLifecycleStore,
} from './pageLifecycle';
import { forEachObj, isFunction } from './shared';
import { resetUpdateData, setUpdateData, getUpdateData } from './updateData';
import { useAutoUpdate } from './useAutoUpdate';

type DataOption = WechatMiniprogram.Component.DataOption;
type CustomOption = WechatMiniprogram.Page.CustomOption;

interface Setup<TData extends DataOption, TCustom extends CustomOption> {
  (
    this: void,
    query: Record<string, string | undefined>,
    context: Pick<
      WechatMiniprogram.Page.Instance<TData, TCustom>,
      | 'animate'
      | 'clearAnimation'
      | 'createIntersectionObserver'
      | 'createSelectorQuery'
      | 'getOpenerEventChannel'
      | 'getPageId'
      | 'getRelationNodes'
      | 'getTabBar'
      | 'groupSetData'
      | 'hasBehavior'
      | 'is'
      | 'options'
      | 'route'
      | 'selectAllComponents'
      | 'selectComponent'
      | 'selectOwnerComponent'
      | 'setUpdatePerformanceListener'
    >
  ): () => Record<string, any> | Promise<Record<string, any>>;
}

type PageOptions<
  TData extends DataOption,
  TCustom extends CustomOption
> = WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
  setup?: Setup<TData, TCustom>;
};

export const PageWithSetup = <TData extends DataOption, TCustom extends CustomOption>(
  options: PageOptions<TData, TCustom>
) => {
  if (options.setup) {
    runPageSetup(options);
  }
  return Page(options);
};

export const runPageSetup = <TData extends DataOption, TCustom extends CustomOption>(
  options: PageOptions<TData, TCustom>
) => {
  const lifecycleStore = getLifecycleStore(),
    originLifetimes = getOldLifetimes(options),
    // 单独抽出来是为了避免通过 this 访问 options
    setup = options.setup;

  registerLifecyle(lifecycleStore, options);

  /**
   * 在组件 attached 时运行 setup，因为只有
   * 此时才能获取 properties 中的值。
   */
  options.onLoad = function (
    this: WechatMiniprogram.Page.Instance<TData, TCustom>,
    /** 打开当前页面路径中的参数 */
    query: Record<string, string | undefined>
  ) {
    originLifetimes['onLoad']?.call(this, query);
    setCurrentPage(this);
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

    let getData = setup!(query, getContext(this));
    if (isFunction(getData)) {
      common.call(this);
    } else if (getData instanceof Promise) {
      (getData as any).then((res: any) => {
        getData = res;
        common.call(this);
      });
    } else {
      if (__DEV__) throw `setup 必须返回一个函数`;
    }

    function common(this: any) {
      registerDatasAndMethods(this, (getData as any)());
      resetUpdateData();

      // 页面销毁时清空已注册的生命周期函数
      // 注意：需放在 setup 之后，不然其它注册的 detached 函数不会执行
      onPageUnload(() => emptyLifecycleStore(this));
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
      'getOpenerEventChannel',
      'getPageId',
      'getRelationNodes',
      'getTabBar',
      'groupSetData',
      'hasBehavior',
      'is',
      'options',
      'route',
      'selectAllComponents',
      'selectComponent',
      'selectOwnerComponent',
      'setUpdatePerformanceListener',
    ];

  for (const key of keys) {
    result[key] = instance[key];
  }

  return Object.freeze(result);
};

const registerLifecyle = <TData extends DataOption, TCustom extends CustomOption>(
  lifecycleStore: LifecycleStore,
  options: PageOptions<TData, TCustom>
) => {
  forEachObj(lifecycleStore, (handlerSet: Map<any, any[]>, key) => {
    options[key] = function (this: any, ...args: any[]) {
      // this 指向页面实例
      handlerSet.get(this)?.forEach((handler) => handler(...args));
    };
  });
};

const registerOldLifecycle = (lifetimes: Record<string, any>) => {
  forEachObj(lifetimes, (handler, key) => {
    if (key === 'onLoad') return;
    key === PageLifecycle.onPageShow && onPageShow(handler);
    key === PageLifecycle.onPageHide && onPageHide(handler);
    key === PageLifecycle.onPageReady && onPageReady(handler);
    key === PageLifecycle.onPageUnload && onPageUnload(handler);
    key === PageLifecycle.onPageResize && onPageResize(handler);
    key === PageLifecycle.onPullDownRefresh && onPullDownRefresh(handler);
    key === PageLifecycle.onReachBottom && onReachBottom(handler);
    key === PageLifecycle.onPageScroll && onPageScroll(handler);
    key === PageLifecycle.onTabItemTap && onTabItemTap(handler);
    key === PageLifecycle.onSaveExitState && onSaveExitState(handler);
  });
};

const getOldLifetimes = (options: Record<string, any>) => {
  const result: Record<string, any> = {};
  forEachObj(PageLifecycle, (v) => {
    if (options[v]) {
      result[v] = options[v];
    }
  });
  return result;
};

const registerDatasAndMethods = (pageInstance: any, dataAndMethod: Record<string, any>) => {
  const data: any = {};
  forEachObj(dataAndMethod, (v, key) => {
    if (isFunction(v)) {
      // 用户不需手动使用 useAutoUpdate，
      // 终极目标是用户可以不知道 useAutoUpdate 的存在。
      pageInstance[key] = useAutoUpdate(v);
    } else {
      data[key] = v;
    }
  });
  pageInstance.setData(data);
};
