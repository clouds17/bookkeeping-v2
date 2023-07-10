## bookkeeping-v2

### node版本

- 16版本

### 项目遇到的问题 

##### 一、 用@引用 scss的问题

- js中引入： @代表了 src 目录
- iconfont.css：引入路径用'@/....'绝对路径
- css里也可以用@引入
  - 用~@引用， 代表src目录
    -  `@import '~@/assets/style.scss';`
  - 问题
    - `@import url('~@/xxx.css')` 用@import url()只能引入css文件
    - 要引入scss只能用 @import '~@/xxxx.scss', 不加url