import { nextTick } from '../../src/useAutoUpdate';
import { getPage } from '../utils/getPage';

describe('Page: async setup', () => {
  it('正常渲染', async () => {
    const com = getPage('AsyncSetup');
    const container = document.createElement('div');
    com.attach(container);
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>');

    await nextTick();
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>');
  })
})