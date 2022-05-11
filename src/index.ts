type DataOption = WechatMiniprogram.Component.DataOption;
type CustomOption = WechatMiniprogram.Page.CustomOption;
type PropertyOption = WechatMiniprogram.Component.PropertyOption;
type MethodOption = WechatMiniprogram.Component.MethodOption;

interface Setup {
  (): () => Record<string, any>;
}

export const ComponentWithLifecycle = (
  options: WechatMiniprogram.Component.Options<
    DataOption,
    PropertyOption,
    MethodOption
  > & { setup?: Setup }
) => {
  return Component(options);
};

export const PageWithLifecycle = (
  options: WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
    setup?: Setup;
  }
) => {
  return Page(options);
};
