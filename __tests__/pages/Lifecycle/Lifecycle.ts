import {
  onPageHide,
  onPageScroll,
  onPullDownRefresh,
  onReachBottom,
  onPageReady,
  onPageResize,
  onSaveExitState,
  onPageShow,
  onTabItemTap,
  onPageUnload,
} from '../../../src/pageLifecycle';
import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent';

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad';

    onPageShow(() => {
      lifecycleName = 'onShow';
    });
    onPageHide(() => {
      lifecycleName = 'onHide';
    });
    onReachBottom(() => {
      lifecycleName = 'onReachBottom';
    });
    onPageReady(() => {
      lifecycleName = 'onReady';
    });
    onPageScroll(() => {
      lifecycleName = 'onPageScroll';
    });
    onPageUnload(() => {
      lifecycleName = 'onUnload';
    });
    onTabItemTap(() => {
      lifecycleName = 'onTabItemTap';
    });
    onSaveExitState(() => {
      lifecycleName = 'onSaveExitState';
    });
    onPullDownRefresh(() => {
      lifecycleName = 'onPullDownRefresh';
    });
    onPageResize(() => {
      lifecycleName = 'onResize';
    });

    return () => ({
      lifecycleName,
    });
  },
});
