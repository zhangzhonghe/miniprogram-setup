import { nextTick } from '../../src/useAutoUpdate';
import { getComponent } from '../utils/getCom';

describe('异步的生命周期函数', () => {
  it('应该正常调用已注册的异步生命周期函数，且显示正确的状态', async () => {
    const com = getComponent('AsyncLifeCycle');
    const container = document.createElement('div');
    com.attach(container);
    expect(com.dom!.innerHTML).toBe('<wx-view>attached</wx-view>');

    com.triggerLifeTime('ready');
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>ready</wx-view>');

    com.triggerLifeTime('moved');
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>moved</wx-view>');

    com.triggerLifeTime('error');
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>error</wx-view>');

    com.detach();
    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>detached</wx-view>');
  });
});
