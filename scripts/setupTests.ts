/* eslint-disable @typescript-eslint/ban-ts-comment */
global.setTimeout = setTimeout
global.setInterval = setInterval

// 模拟小程序 API
;(global as any).wx = {
  request(options: { url: string; success?: any; fail?: any; complete?: any }) {
    const { success, fail, complete } = options
    // @ts-expect-error
    global.requestSuccess = success
    // @ts-expect-error
    global.requestFail = fail
    // @ts-expect-error
    global.requestComplete = complete
  },
}
