import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent';
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
} from '../../../src';

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'onLoad';

    onPageShow(async () => {
      lifecycleName = await 'onShow';
    });
    onPageHide(async () => {
      lifecycleName = await 'onHide';
    });
    onReachBottom(async () => {
      lifecycleName = await 'onReachBottom';
    });
    onPageReady(async () => {
      lifecycleName = await 'onReady';
    });
    onPageScroll(async () => {
      lifecycleName = await 'onPageScroll';
    });
    onPageUnload(async () => {
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
    onPageResize(async () => {
      lifecycleName = await 'onResize';
    });

    return () => ({
      lifecycleName,
    });
  },
});
