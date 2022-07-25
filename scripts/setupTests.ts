global.setTimeout = setTimeout;

// 模拟小程序 API
(global as any).wx = {
  request: function (options: { url: string; success?: any; fail?: any; complete?: any }) {
    const { success, fail, complete } = options;
    //@ts-ignore
    global.requestSuccess = success;
    //@ts-ignore
    global.requestFail = fail;
    //@ts-ignore
    global.requestComplete = complete;
  },
};
