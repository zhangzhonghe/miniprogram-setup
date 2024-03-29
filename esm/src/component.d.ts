/// <reference types="miniprogram-api-typings" />
declare type DataOption = WechatMiniprogram.Component.DataOption;
declare type PropertyOption = WechatMiniprogram.Component.PropertyOption;
declare type MethodOption = WechatMiniprogram.Component.MethodOption;
declare type Setup<TData extends DataOption, TProperty extends PropertyOption, TMethod extends MethodOption, P> = (this: void, data: P, context: Pick<WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>, 'animate' | 'clearAnimation' | 'createIntersectionObserver' | 'createSelectorQuery' | 'dataset' | 'getOpenerEventChannel' | 'getPageId' | 'getRelationNodes' | 'getTabBar' | 'groupSetData' | 'hasBehavior' | 'id' | 'is' | 'selectAllComponents' | 'selectComponent' | 'selectOwnerComponent' | 'setUpdatePerformanceListener' | 'triggerEvent'>) => (() => Record<string, any>) | Promise<() => Record<string, any>>;
declare type ComponentOptions<TData extends DataOption, TProperty extends PropertyOption, TMethod extends MethodOption> = WechatMiniprogram.Component.Options<TData, TProperty, TMethod> & {
    setup?: Setup<TData, TProperty, TMethod, WechatMiniprogram.Component.PropertyOptionToData<TProperty>>;
};
export declare const ComponentWithSetup: <TData, TProperty extends WechatMiniprogram.Component.PropertyOption, TMethod extends WechatMiniprogram.Component.MethodOption>(options: ComponentOptions<TData, TProperty, TMethod>) => string;
export {};
