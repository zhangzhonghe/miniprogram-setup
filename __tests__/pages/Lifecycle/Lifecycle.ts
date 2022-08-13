import {
  onHide,
  onPageScroll,
  onPullDownRefresh,
  onReachBottom,
  onReady,
  onResize,
  onSaveExitState,
  onShow,
  onTabItemTap,
  onUnload,
} from '../../../src/pageLifecycle';
import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent';

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad';

    onShow(() => {
      lifecycleName = 'onShow';
    });
    onHide(() => {
      lifecycleName = 'onHide';
    });
    onReachBottom(() => {
      lifecycleName = 'onReachBottom';
    });
    onReady(() => {
      lifecycleName = 'onReady';
    });
    onPageScroll(() => {
      lifecycleName = 'onPageScroll';
    });
    onUnload(() => {
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
    onResize(() => {
      lifecycleName = 'onResize';
    });

    return () => ({
      lifecycleName,
    });
  },
});
