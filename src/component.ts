import {
  initLifecycleStore,
  LifecycleStore,
  onAttached,
  registerComponentLifecyle,
} from './componentLifecycle';
import { forEachObj, isFunction, NOOP } from './shared';
import { setUpdateData } from './updateData';

type DataOption = WechatMiniprogram.Component.DataOption;
type PropertyOption = WechatMiniprogram.Component.PropertyOption;
type MethodOption = WechatMiniprogram.Component.MethodOption;

interface Setup<T> {
  (data: T): () => Record<string, any>;
}

type ComponentOptions<
  TData extends DataOption,
  TProperty extends PropertyOption,
  TMethod extends MethodOption
> = WechatMiniprogram.Component.Options<TData, TProperty, TMethod> & {
  setup?: Setup<TData & TProperty>;
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
    originCreated = options.lifetimes?.['created'] || options.created;

  registerLifecyle(lifecycleStore, options);

  (options.lifetimes || (options.lifetimes = {})).created = function (this: any) {
    originCreated?.();
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
    const getData = options.setup!(this.data);
    registerDataAndMethod(this, getData());
  };
};

const registerLifecyle = <TData, TProperty extends PropertyOption, TMethod extends MethodOption>(
  lifecycleStore: LifecycleStore,
  options: ComponentOptions<TData, TProperty, TMethod>
) => {
  const lifetimes = (options.lifetimes = options.lifetimes || {});

  forEachObj(lifetimes, (handler, key) => {
    registerComponentLifecyle(key as any, handler);
  });
  forEachObj(lifecycleStore, (handlerSet: any[], key) => {
    lifetimes[key] = function (...args: any[]) {
      // 保持 this 的引用指向组件示例
      handlerSet.forEach((handler) => handler.call(this, ...args));
    };
  });
};

const registerDataAndMethod = (componentInstance: any, dataAndMethod: Record<string, any>) => {
  const data: any = {};
  forEachObj(dataAndMethod, (v, key) => {
    if (isFunction(v)) {
      componentInstance[key] = v;
    } else {
      data[key] = v;
    }
  });
  onAttached(() => componentInstance.setData(data));
};
