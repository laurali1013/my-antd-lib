####  4-2 代码规范
  - 代码规范的提醒
    - create-react-app官方文档
      - When working with TypeScript, you'll need to provide an overrides object for rules that should only target TypeScript files.当使用typescript时，针对typescript文件规则，需要提供一个可覆盖的规则对象。
      - a new rule has been set that applies to all JavaScript and TypeScript files对于所有的js和ts文件已经有一个默认规则设置
      - a new rule has been set that only targets TypeScript files对于ts文件已经有一个新规则设置
    - **以上现在不需要配置，未发现上述问题(==两个等号没有warnning问题未发现)**
####  4-3 样式
  - inline CSS：**不推荐**
  - CSS in JS：**不推荐**
  - Sass/Less：**建议**
  - Sass知识(normalize.css提供开发的默认基础样式)
    - $white #fff !default  ：$定义变量,!default如果之前变量已赋值，那就不使用默认值，如果没有赋值，使用默认值
    - **%heading：%占位符，用占位符声明的代码，如果不被@extend调用就不会被编译**
    - @extend %heading： 继承heading
    - @import：不会创建新的http请求，导入partial文件时不需要加下划线
    - reboot.scss：partial文件，不会编译成css文件，只当作模块导入使用，不能单独使用
    - & 夫选择器标识符
    - @mixin button-size($padding-x,$padding-y...){...}:mixin可复用的css样式，可传入参数
    - @include button-size(100,200...):调用mixin
    - Built-In function：内置函数lighten(color,value)比color少value百分比
####  4-7 button组件
  - button需求分析
    - 不同的Button Type：Primary、Default、Danger、LinkButton
    - 不同的Button Size：Normal、Small、Large
    - Disabled：Disabled、linkButton（href）没有默认的disabled属性，需要单独处理
    - 支持原生属性、children属性
     （React.ButtonHTMLAttributes<HTMLelement>）
      patial属性
    - 实现流程
      - 创建常量（type和size）
      - 创建接口props（type，size，disabled，classname，href，children）
      - 创建主函数的注意事项
        - npm install classnames --save 、npm install @types/classnames --save 
        - classname默认要有btn类，其他可选[btn-lg,btn-sm,btn-primary,disabled...]
        - 如果classname是变化的，可以用[classname]:true中括号
        - 判断是a链接还是一个普通的button？
        - 使用defaultProps设定默认值
  - button组件的样式
  - button组件的测试
  - button组件的storybook

    