import {
  initLifecycleStore,
  LifecycleStore,
  onCreated,
  registerComponentLifecyle,
} from './componentLifecycle';
import { forEachObj, isFunction } from './shared';
import { setUpdateData } from './updateData';

type DataOption = WechatMiniprogram.Component.DataOption;
type PropertyOption = WechatMiniprogram.Component.PropertyOption;
type MethodOption = WechatMiniprogram.Component.MethodOption;

interface Setup {
  (): () => Record<string, any>;
}

type ComponentOptions = WechatMiniprogram.Component.Options<
  DataOption,
  PropertyOption,
  MethodOption
> & { setup?: Setup };

export const ComponentWithLifecycle = (options: ComponentOptions) => {
  if (options.setup) {
    runComponentSetup(options);
  }
  return Component(options);
};

const runComponentSetup = (options: ComponentOptions) => {
  const lifecycleStore = initLifecycleStore();
  registerLifecyle(lifecycleStore, options.lifetimes);
  const getData = options.setup!();
  registerDataAndMethod(options, getData());
  onCreated(function () {
    setUpdateData(() => {
      const data = getData();
      forEachObj(data, (v, key) => {
        if (isFunction(v)) {
          delete data[key];
        }
      });
      // this 指向组件示例
      // @ts-ignore
      this.setData(data);
    });
  });
};

const registerLifecyle = (
  lifecycleStore: LifecycleStore,
  lifetimes?: ComponentOptions['lifetimes']
) => {
  if (!lifetimes) return;
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

const registerDataAndMethod = (options: ComponentOptions, data: Record<string, any>) => {
  options.data = options.data || {};
  options.methods = options.methods || {};
  forEachObj(data, (v, key) => {
    if (isFunction(v)) {
      options.methods![key] = v;
    } else {
      options.data![key] = v;
    }
  });
};
