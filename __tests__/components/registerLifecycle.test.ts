import { nextTick } from '@/useAutoUpdate';
import { getComponent } from '@tests/utils/getCom';

describe('嵌套组件，应该正确注册生命周期函数', () => {
  it('应该注册到子组件本身', async () => {
    const com = getComponent('Container');
    const container = document.createElement('div');
    com.attach(container);

    await nextTick();
    await nextTick();
    expect(com.dom!.innerHTML).toBe(
      '<asyncnestedcomponents class="main--com"><wx-view>beforeMove</wx-view></asyncnestedcomponents>'
    );

    const child = com.instance.selectComponent('.com');
    child.triggerLifeTime('moved');
    await nextTick();
    expect(com.dom!.innerHTML).toBe(
      '<asyncnestedcomponents class="main--com"><wx-view>moved</wx-view></asyncnestedcomponents>'
    );
  });
});
