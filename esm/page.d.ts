/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
declare type DataOption = WechatMiniprogram.Component.DataOption;
declare type CustomOption = WechatMiniprogram.Page.CustomOption;
interface Setup {
    (): () => Record<string, any>;
}
declare type PageOptions = WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
    setup?: Setup;
};
export declare const PageWithSetup: (options: PageOptions) => void;
export {};
