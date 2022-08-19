import { getComponent } from '@tests/utils/getCom'
import { nextTick } from '@/useAutoUpdate'

describe('wxApi', () => {
  it('success/fail/complete 调用时应该刷新视图', async () => {
    const com = getComponent('WxAPI')
    const container = document.createElement('div')
    com.attach(container)
    expect(com.dom!.innerHTML).toBe('<wx-view>pending</wx-view>')

    // 模拟接口调用成功
    // @ts-expect-error
    requestSuccess()
    await nextTick()
    expect(com.dom!.innerHTML).toBe('<wx-view>success</wx-view>')

    // @ts-expect-error
    requestFail()
    await nextTick()
    expect(com.dom!.innerHTML).toBe('<wx-view>fail</wx-view>')

    // @ts-expect-error
    requestComplete()
    await nextTick()
    expect(com.dom!.innerHTML).toBe('<wx-view>complete</wx-view>')
  })
})
