import { nextTick } from '../../src/useAutoUpdate';
import { getComponent } from '../utils/getCom';

describe('状态更改时，自动更新视图', () => {
  const com = getComponent('Counter');
  const container = document.createElement('div');
  com.attach(container);

  it('应该正常渲染初始值', () => {
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>');
  });

  it('应该正常渲染更新后的值', async () => {
    // 使 count 自增一次
    com.instance.increment();

    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>');
  });
});
