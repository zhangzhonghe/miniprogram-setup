import { describe, expect, it } from 'vitest'
import { nextTick } from '../../src/useAutoUpdate'
import { getComponent } from '../utils/getCom'

describe('async setup', () => {
  it('正常渲染', async () => {
    const com = getComponent('AsyncSetup')
    const container = document.createElement('div')
    com.attach(container)
    expect(com.dom!.innerHTML).toBe('<wx-view>0</wx-view>')

    await nextTick()
    expect(com.dom!.innerHTML).toBe('<wx-view>1</wx-view>')
  })
})