这是一个快速开发框架  
技术栈是 `nuxt+vant+less+ts`  
用于常见运营活动和 H5 业务页面。
由于公司项目特殊性，仅用于静态页面渲染（非 SSR 模式）。

Nuxt官网: https://www.nuxtjs.cn/
Nuxt TypeScript官网：https://typescript.nuxtjs.org/
装饰器语法参考文档：https://github.com/kaorun343/vue-property-decorator


#### 预加载资源

预加载资源类似网上常见的 h5 页面，在所有页面加载之前有一个加载页面，用于加载当前项目需要加载的资源文件，此处为图片。  
建议把超过 60kb 的图片文件放入预加载中。目录地址 `/components/preload.vue`。  
预加载图片支持 图片标签引入和背景图片引入。

·图片引入方式为 `images/demo.png` （路径是 `static` 目录下的路径,例如 此处目录是 `/static/images/demo.png`）  
·背景图片引入方式为 `background: url('@{subdir}images/process_bg.jpg')`;`@{subdir}`是定义在 `var.less` 里的子目录变量，直接使用。

#### 启动开发环境

```
$ yarn dev
```

#### 生成正常生产环境文件

生成生产环境项目（es6）

```
$ yarn g
```

#### 生成 es5 低版本生产环境文件并自动上传到测试环境。

更改根目录`deplay.js` 文件中`remoteRoot`字段，可以更改上传目录

```
$ yarn gen
```

#### 前端监控

在 `app.html` 文件中，修改 `_bid` 的值，可以将此应用加入监控

#### 调试

在 `core/config.js` 中配置 `isDebug` 可以开启/关闭调试。  
另一种显示 vconsole 的方法是 url 添加参数 debug=1，多用于线上排查问题。

#### 移动端单位适配

请以 750 设计稿为标准，单位为正常的 px，编译后会自动转化为 rem。

#### IOS15 踩坑

ios15 系统为了生成图片正常需在样式中加入一个默认字体，例如：`font-family:Helvetica`

#### 图片压缩

如果设计同学给的图片过大，可以使用如下在线工具免费压缩。
https://tinypng.com/
