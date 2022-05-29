import {
  initLifecycleStore,
  LifecycleStore,
  onCreated,
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
  const lifecycleStore = initLifecycleStore();
  let updateData = NOOP;
  setUpdateData(() => updateData());
  const getData = options.setup!();

  registerDataAndMethod(options, getData());
  onCreated(function () {
    updateData = () => {
      const data = getData();
      forEachObj(data, (v, key) => {
        if (isFunction(v)) {
          delete data[key];
        }
      });
      // this 指向组件示例
      // @ts-ignore
      this.setData(data);
    };
  });

  registerLifecyle(lifecycleStore, options);
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

const registerDataAndMethod = <
  TData,
  TProperty extends PropertyOption,
  TMethod extends MethodOption
>(
  options: ComponentOptions<TData, TProperty, TMethod>,
  data: Record<string, any>
) => {
  options.data = options.data || {} as any;
  options.methods = options.methods || {} as any;
  forEachObj(data, (v, key) => {
    if (isFunction(v)) {
      // @ts-ignore
      options.methods[key] = v;
    } else {
      // @ts-ignore
      options.data[key] = v;
    }
  });
};
