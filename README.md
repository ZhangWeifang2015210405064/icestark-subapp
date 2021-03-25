## 【模板-待替换工程名称-请读我】
@TODO 请在初始化完善当前应用的相关说明

#### 可执行命令
```bash
# 安装依赖
$ yarn install / yarn install

# 启动服务
$ yarn start / yarn start

# 单元测试
$ yarn test / yarn test

# 构建
$ yarn build / yarn build
```

#### Commit规范
```bash
# ======== Git提交message规范 ========
# 主要type
# feat:     增加新功能
# fix:      修复bug
# feat, fix 都需要在 commit content之后关联issue编号
# 例如: fix: 修复总览排版问题#1

# 特殊type
# docs:     只改动了文档相关的内容
# style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
# build:    构造工具的或者外部依赖的改动，例如webpack，npm
# refactor: 代码重构时使用
```
#### package.json
- cross-env          : 使用cross-env添加环境变量

#### config-overrides【覆写webpack】
- addWebpackExternals: 打包构建时忽略的依赖
- addWebpackAlias    : 别名配置
  - @: 'src', 例如 import HelloWorld from '@/components/HelloWorld' 表示 import HelloWorld from 'src/components/HelloWorld'
  - 其他需要增加请自行配置
- overrideDevServer  : 开发服务器配置,设置静态资源允许跨域访问
- adjustStyleLoaders : 修改样式Loader, 目前已全局引入 variable.scss & mixins.scss,可以直接使用不再需要在scss文件内引入
  - variable.scss	 : 常用样式变量
  - mixins.scss

### ui
> [Wind-阿里云UI库](https://aliyun.github.io/alibabacloud-console-components/guides/quick-start)
> Sass: 使用Sass作为预编译css语言

### 编辑器
> vscode请安装插件【EditorConfig for VS Code】统一编辑器格式
```
#具体可查看 .editorconfig 文件
indent_style = tab // 缩进使用tab
indent_size = 4    // 缩进长度为4
```

### code lint
> EsLint + Prettier
> 默认配置，需要额外配置请自行添加@TODO最佳实践待整理
> eslint解析配置ecmaVersion为2020
> babel支持2020语法: ?.[可选连操作符] ??[空位合并操作符]

#### .env
> 注意：作为微前端下的子应用模块时使用，其余情况请忽略
> 请在 .env.development/production 文件内添加以下环境变量
> 	1. INLINE_RUNTIME_CHUNK = false 【react打包时的runtime.js在生产环境会以内联script形式加载，微前端如果以entry的静态资源导入形式会缺失该文件，所以需设置成关闭[false]】
>	2. PORT = 端口  【本地服务器开启时的端口】
>   3. HOSTNAME = http://localhost:端口
> 	【静态资源（例如图片）通过相对路径加载，如果在子应用在主应用下渲染时，会使用主应用的域名导致404，该环境变量主要配合 config-overrides.js 内的 publicPath 配置使用】

|      工程名称       | 端口[PORT] |
|:-------------------|----------:|
|    core            |    3001   |
|    pipeline        |    3002   |
|    log             |    3003   |
|    oam             |    3004   |
|    bak             |    3005   |
|    harbor          |    3006   |
|    federation      |    3007   |
|    cloudedge       |    3008   |
