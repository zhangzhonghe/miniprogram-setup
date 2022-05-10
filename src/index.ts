type DataOption = WechatMiniprogram.Component.DataOption;
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
): string => {
  return Component(options);
};
