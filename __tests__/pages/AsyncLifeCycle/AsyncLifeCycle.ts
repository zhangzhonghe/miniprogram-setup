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
} from '@/index'

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad'

    onPageShow(async () => {
      lifecycleName = await 'onShow'
    })
    onPageHide(async () => {
      lifecycleName = await 'onHide'
    })
    onReachBottom(async () => {
      lifecycleName = await 'onReachBottom'
    })
    onPageReady(async () => {
      lifecycleName = await 'onReady'
    })
    onPageScroll(async () => {
      lifecycleName = await 'onPageScroll'
    })
    onPageUnload(async () => {
      lifecycleName = await 'onUnload'
    })
    onTabItemTap(async () => {
      lifecycleName = await 'onTabItemTap'
    })
    onSaveExitState(async () => {
      lifecycleName = await 'onSaveExitState'
    })
    onPullDownRefresh(async () => {
      lifecycleName = await 'onPullDownRefresh'
    })
    onPageResize(async () => {
      lifecycleName = await 'onResize'
    })

    return () => ({
      lifecycleName,
    })
  },
})
