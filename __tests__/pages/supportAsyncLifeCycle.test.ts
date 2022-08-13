import { nextTick } from '../../src/useAutoUpdate';
import { getPage } from '../utils/getPage';

describe('Page: 异步的生命周期函数', () => {
  it('应该正常调用已注册的异步生命周期函数，且显示正确的状态', async () => {
    const com = getPage('AsyncLifeCycle');
    const container = document.createElement('div');
    com.attach(container);
    com.instance.onLoad();

    expect(com.dom!.innerHTML).toBe('<wx-view>onLoad</wx-view>');

    com.instance.onShow();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onShow</wx-view>');

    com.instance.onReady();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onReady</wx-view>');

    com.instance.onHide();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onHide</wx-view>');

    com.instance.onReachBottom();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onReachBottom</wx-view>');

    com.instance.onPageScroll();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onPageScroll</wx-view>');

    com.instance.onTabItemTap();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onTabItemTap</wx-view>');

    com.instance.onSaveExitState();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onSaveExitState</wx-view>');

    com.instance.onPullDownRefresh();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onPullDownRefresh</wx-view>');

    com.instance.onResize();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onResize</wx-view>');

    // 需最后调用该生命周期
    com.instance.onUnload();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>onUnload</wx-view>');
  });
});
