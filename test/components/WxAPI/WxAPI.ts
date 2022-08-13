import { ComponentWithSetup } from '../../../src'

ComponentWithSetup({
  setup() {
    let status = 'pending'

    wx.request({
      url: 'test',
      success: () => {
        status = 'success'
      },
      fail: () => {
        status = 'fail'
      },
      complete: () => {
        status = 'complete'
      },
    })

    return () => ({
      status,
    })
  },
})
