type DataOption = WechatMiniprogram.Component.DataOption
type CustomOption = WechatMiniprogram.Page.CustomOption

interface Setup<TData extends DataOption, TCustom extends CustomOption> {
  (
    this: never,
    context: Pick<
      WechatMiniprogram.Page.Instance<TData, TCustom>,
      | 'animate'
      | 'clearAnimation'
      | 'createIntersectionObserver'
      | 'createSelectorQuery'
      | 'getOpenerEventChannel'
      | 'getPageId'
      | 'getRelationNodes'
      | 'getTabBar'
      | 'groupSetData'
      | 'hasBehavior'
      | 'is'
      | 'options'
      | 'route'
      | 'selectAllComponents'
      | 'selectComponent'
      | 'selectOwnerComponent'
      | 'setUpdatePerformanceListener'
    >
  ): () => Record<string, any> | Promise<Record<string, any>>
}

type PageOptions<
  TData extends DataOption,
  TCustom extends CustomOption,
> = WechatMiniprogram.Page.Options<DataOption, CustomOption> & {
  setup?: Setup<TData, TCustom>
}

export const PageWithSetup = <TData extends DataOption, TCustom extends CustomOption>(
  options: PageOptions<TData, TCustom>,
) => {
  if (options.setup)
    runPageSetup(options)

  return Page(options)
}

const runPageSetup = <TData extends DataOption, TCustom extends CustomOption>(
  options: PageOptions<TData, TCustom>,
) => {

}

const getContext = (instance: any) => {
  const result: any = {}
  const keys = [
    'animate',
    'clearAnimation',
    'createIntersectionObserver',
    'createSelectorQuery',
    'getOpenerEventChannel',
    'getPageId',
    'getRelationNodes',
    'getTabBar',
    'groupSetData',
    'hasBehavior',
    'is',
    'options',
    'route',
    'selectAllComponents',
    'selectComponent',
    'selectOwnerComponent',
    'setUpdatePerformanceListener',
  ]

  for (const key of keys)
    result[key] = instance[key]

  return Object.freeze(result)
}
