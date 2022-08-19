import { getPage } from '@tests/utils/getPage'
import { nextTick } from '@/useAutoUpdate'

describe('Page: 状态更改时，自动更新视图', () => {
  const com = getPage('Counter')
  const container = document.createElement('div')
  com.attach(container)
  com.instance.onLoad()

  it('应该正常渲染初始值', () => {
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>')
  })

  it('应该正常渲染更新后的值', async () => {
    // 使 count 自增一次
    com.instance.increment()

    await nextTick()
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>')
  })
})
