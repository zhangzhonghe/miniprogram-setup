# 背景
在小程序中实现「组合式 API」的库已经有不少，比如 [vue-mini](https://github.com/vue-mini/vue-mini) 和 [wx-setup](https://github.com/Maizify/wx-setup)，它们都是使用 Vue3 的[响应式库](https://github.com/vuejs/core/tree/main/packages/reactivity)实现的。但是，Vue3 的响应式 API 特别复杂，我数了一下，暴露出来的竟然有 50 多个 API，当然我不是说它不好用，只是要下很大的功夫才能用好。

于是我就想，有没有更简单的方式实现「组合式 API」的效果，于是就创建了 [miniprogram-setup](https://github.com/zhangzhonghe/miniprogram-setup) 这么个项目，**现在还是试验阶段。**

# 安装
直接在项目目录下运行以下命令。

```
npm install miniprogram-setup
```
然后在小程序开发者工具中点击「构建 npm」。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fbf5023f3534f31855bd609019b846b~tplv-k3u1fbpfcp-watermark.image?)

# 一个简单的例子

```js
import { ComponentWithSetup, onAttached, onDetached, useRefresh } from 'miniprogram-setup';

ComponentWithSetup({
  setup() {
    let count = 0;

    // 使用 useRefresh ，状态更改会自动更新视图
    const handleClick = useRefresh(() => {
      count++;
    });

    // 组件挂载时运行
    onAttached(() => {
      console.log('attached');
    });
    // 组件销毁时运行
    onDetached(() => {
      console.log('detached');
    })

    // 返回的状态和事件监听器直接在模板中使用
    return () => ({
      count,
      handleClick
    });
  },
});


```
对应的 wxml 文件：

```html
<button class="btn" bindtap="handleClick">{{count}}</button>
```

实际的效果可以点击查看这个[代码片段](https://developers.weixin.qq.com/s/AvHYYFmC7jz5)。


# 理念
目前除了生命周期函数之外仅有 2 个 API，当然现在是起步阶段，以后可能会更多，但绝不会有 50 个这个多！

**简单**就是我的理念。😂

如果你对这个项目感兴趣欢迎提 [Issue](https://github.com/zhangzhonghe/miniprogram-setup/issues) ～

> 注意：现在还是试验阶段，请不要在生产环境中使用。