# 疫情H5

基于 [taro](https://taro.aotu.io/) + `dva` + `Typescript` 框架搭建的疫情H5


## 维护开发

```
# 全局安装tarojs
npm install -g @tarojs/cli

# 安装依赖
yarn or yarn install

# 开发
yarn dev:h5

# mock
yarn mock
ps: 另起一个命令行窗口，跑这个服务

# 打包
yarn run build
```

## 开发规范文档

[standard-doc](http://work.lidig.com:8088/framework/front-framework/standard-doc)


## Mock

* 基于 [mocker-api](https://github.com/jaywcjlove/mocker-api) 实现的本地mock服务
*  由于 `mocker-api` 的约束，mock文件只能使用 `js` 编写，并且只支持 CommonJS 规范
*  **Mock服务开启后，需要将 `config/dev.js` 中的 `API_PREFIX` 变量修改为Mock服务地址**


## 注意点

* 新建组件流程：大驼峰命名文件名，文件夹下新建 `index.{jsx|tsx}` 和 `index.less`。
* 每个Page页下面除组件外，增加 `model.ts`，每次新增 `model.ts` 都需要在 `src/models/index.ts` 中**手动引入**
*  工程已经配置了 `path alias`, 具体查看 `config/index.ts` 文件，文件导入路径一律采用alias的方式


## 样式约定
	颜色、间距、字体大小等都以定义变量的方式存在
    
全局通用样式定义在 **src/styles**，基于`scss`

具体页面的属性使用变量名赋值

```css
.inputIcon {
  color: @normal-color;
}
.inputIconFocus {
  color: @primary-color;
}
```


## 代码规范

* 使用`eslint`、`stylelint`搭配`husky`、`lint-staged`做JS、TS和CSS语法检查
* 使用`commitizen`做代码提交规范控制，需要`npm install -g commitizen`，然后用`git cz`代替`git commit`


## LICENSE

MIT
