/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
declare type DataOption = WechatMiniprogram.Component.DataOption;
declare type CustomOption = WechatMiniprogram.Page.CustomOption;
declare type Setup<TData extends DataOption, TCustom extends CustomOption> = (this: void, query: Record<string, string | undefined>, context: Pick<WechatMiniprogram.Page.Instance<TData, TCustom>, 'animate' | 'clearAnimation' | 'createIntersectionObserver' | 'createSelectorQuery' | 'getOpenerEventChannel' | 'getPageId' | 'getRelationNodes' | 'getTabBar' | 'groupSetData' | 'hasBehavior' | 'is' | 'options' | 'route' | 'selectAllComponents' | 'selectComponent' | 'selectOwnerComponent' | 'setUpdatePerformanceListener'>) => () => Record<string, any> | Promise<Record<string, any>>;
declare type PageOptions<TData extends DataOption, TCustom extends CustomOption> = WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
    setup?: Setup<TData, TCustom>;
};
export declare const PageWithSetup: <TData extends WechatMiniprogram.Component.DataOption, TCustom extends WechatMiniprogram.Page.CustomOption>(options: PageOptions<TData, TCustom>) => void;
export declare function runPageSetup<TData extends DataOption, TCustom extends CustomOption>(options: PageOptions<TData, TCustom>): void;
export {};
