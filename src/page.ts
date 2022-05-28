type DataOption = WechatMiniprogram.Component.DataOption;
type CustomOption = WechatMiniprogram.Page.CustomOption;

interface Setup {
  (): () => Record<string, any>;
}

type PageOptions = WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
  setup?: Setup;
};

export const PageWithLifecycle = (options: PageOptions) => {
  return Page(options);
};
