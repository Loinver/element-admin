> vue+axios+vue-router+vuex+mint-ui   模板  (by Linyer)


###### 项目介绍：

* src/assets/css/base.scss文件中有一个$base变量，作为字体的基准，因为我们一般以750px宽的psd作为标准，所以我们设置为100，即1rem = 100px。
* src/assets/js/linyer.js作为本项目的公共js文件。里面包含了数据交互(封装好的axios)、部分常用的处理函数、排序、本地存储(可以设置过期时间的localstorage)、验证中文和手机号、以及md5的加密解密函数。除开使用prototype可以直接调用之外，里面其他函数皆使用一下方法来调用:
```
    import fly from "../assets/js/linyer"
    比如我们调用接口：
    fly.Axios({
        url: this.api.url,
        data: {city_name: encodeURI("成都市")},
        success: function (res) {
            console.log(res)
        }, error: function (err) {
            console.log(err)
        }
    })
```
*其他当前页的scss或者css一般都写在当前页，如果会存在class命名冲突，则使用一下方式

```
    <style lang="scss" scoped>
    详细的scss代码
    </style>
```


###### 目录结构说明：
├─build                           <br>
├─config                          <br>
├─src                             <br>
│  ├─assets                       <br>
│  │  ├─css         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——css目录<br>
│  │  │  └─fonts   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——字体文件目录<br>
│  │  │  └─index.scss    &nbsp; &nbsp;——公共scss文件<br>
│  │  │  └─iconfont.css         &nbsp;——字体图片css文件<br>
│  │  ├─img         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——图片目录<br>
│  │  └─js          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——js目录<br>
│  ├─components     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——组件目录<br>
│  │  └─system      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——系统组件目录<br>
│  ├─router         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——路由目录<br>
│  └─store          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——配置vuex<br>
└─static            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——不需要打包的静态文<br>

## 安装过程:

###### 安装淘宝镜像
> npm install -g cnpm --registry=https://registry.npm.taobao.org

###### 安装webpack
> cnpm install webpack -g

###### 安装脚手架
> npm install vue-cli -g

###### 如果遇到以下之类的报错
> Error: Cannot find module 'opn'

> Error: Cannot find module 'webpack-dev-middleware'

> Error: Cannot find module 'express'

> Module build failed: Error: Cannot find module '模块名'

###### 缺什么安装什么，或者将所有旧环境全部删除，下载最新的环境

> cnpm install 模块名 --save-dev(关于环境的，表现为npm run dev 启动不了)cnpm install 模块名 --save(关于项目的，比如main.js，表现为npm run dev 成功之后控制台报错)

###### 使用方法:
> 开发命令：npm run dev

> 打包命令：npm run build


###### 更新记录:

* 2017-7-21    &nbsp;&nbsp;&nbsp;&nbsp;——1.0.0.1版demo完成,添加路由按需加载。添加keep-alive缓存示例

###### BUGS:

###### FAQ:
* Q:
* A:

###### TODO:

###### THANKS: