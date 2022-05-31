/// <reference types="miniprogram-api-typings" />
declare type DataOption = WechatMiniprogram.Component.DataOption;
declare type PropertyOption = WechatMiniprogram.Component.PropertyOption;
declare type MethodOption = WechatMiniprogram.Component.MethodOption;
interface Setup<T> {
    (data: T): () => Record<string, any>;
}
declare type ComponentOptions<TData extends DataOption, TProperty extends PropertyOption, TMethod extends MethodOption> = WechatMiniprogram.Component.Options<TData, TProperty, TMethod> & {
    setup?: Setup<WechatMiniprogram.Component.PropertyOptionToData<TProperty>>;
};
export declare const ComponentWithSetup: <TData, TProperty extends WechatMiniprogram.Component.PropertyOption, TMethod extends WechatMiniprogram.Component.MethodOption>(options: ComponentOptions<TData, TProperty, TMethod>) => string;
export {};
