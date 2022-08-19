import simulate from 'miniprogram-simulate';
import { getComponent } from '@tests/utils/getCom';

describe('使用定时器', () => {
  it('应该更新视图', async () => {
    const com = getComponent('Timer');
    const container = document.createElement('div');
    com.attach(container);
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>');

    await simulate.sleep(0);
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>');

    await simulate.sleep(1000);
    expect(com.dom!.innerHTML).toBe('<wx-view>2</wx-view>');
  });
});
