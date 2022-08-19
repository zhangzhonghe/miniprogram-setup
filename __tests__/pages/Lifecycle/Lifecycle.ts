import { PageWithSetupForTesting } from '@tests/utils/convertingPageToComponent'
import {
  onPageHide,
  onPageReady,
  onPageResize,
  onPageScroll,
  onPageShow,
  onPageUnload,
  onPullDownRefresh,
  onReachBottom,
  onSaveExitState,
  onTabItemTap,
} from '@/pageLifecycle'

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad'

    onPageShow(() => {
      lifecycleName = 'onShow'
    })
    onPageHide(() => {
      lifecycleName = 'onHide'
    })
    onReachBottom(() => {
      lifecycleName = 'onReachBottom'
    })
    onPageReady(() => {
      lifecycleName = 'onReady'
    })
    onPageScroll(() => {
      lifecycleName = 'onPageScroll'
    })
    onPageUnload(() => {
      lifecycleName = 'onUnload'
    })
    onTabItemTap(() => {
      lifecycleName = 'onTabItemTap'
    })
    onSaveExitState(() => {
      lifecycleName = 'onSaveExitState'
    })
    onPullDownRefresh(() => {
      lifecycleName = 'onPullDownRefresh'
    })
    onPageResize(() => {
      lifecycleName = 'onResize'
    })

    return () => ({
      lifecycleName,
    })
  },
})
