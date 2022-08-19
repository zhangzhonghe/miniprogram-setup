import simulate from 'miniprogram-simulate';
import { getPage } from '@tests/utils/getPage';

describe('Page: 使用定时器', () => {
  it('应该更新视图', async () => {
    const com = getPage('Timer');
    const container = document.createElement('div');
    com.attach(container);
    com.instance.onLoad();

    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>');

    await simulate.sleep(0);
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>');

    await simulate.sleep(1000);
    expect(com.dom!.innerHTML).toBe('<wx-view>2</wx-view>');
  });
});
