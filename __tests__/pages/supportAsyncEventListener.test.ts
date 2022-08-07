import { getPage } from '../utils/getPage';

describe('Page: 异步的事件监听器', () => {
  it('应该正常调用已注册的异步事件监听器', async () => {
    const com = getPage('AsyncEventListener');
    const container = document.createElement('div');
    com.attach(container);
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>');

    await com.instance.increment();
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>');
  });
});
