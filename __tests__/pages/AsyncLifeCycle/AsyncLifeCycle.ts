import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent';
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

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad';

    onShow(async () => {
      lifecycleName = await 'onShow';
    });
    onHide(async () => {
      lifecycleName = await 'onHide';
    });
    onReachBottom(async () => {
      lifecycleName = await 'onReachBottom';
    });
    onReady(async () => {
      lifecycleName = await 'onReady';
    });
    onPageScroll(async () => {
      lifecycleName = await 'onPageScroll';
    });
    onUnload(async () => {
      lifecycleName = await 'onUnload';
    });
    onTabItemTap(async () => {
      lifecycleName = await 'onTabItemTap';
    });
    onSaveExitState(async () => {
      lifecycleName = await 'onSaveExitState';
    });
    onPullDownRefresh(async () => {
      lifecycleName = await 'onPullDownRefresh';
    });
    onResize(async () => {
      lifecycleName = await 'onResize';
    });

    return () => ({
      lifecycleName,
    });
  },
});
