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
     `React.ButtonHTMLAttributes<HTMLelement>`
      Patial解决两种props重叠问题
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
### 5代码测试
  - 测试金字塔：Unit->Service->UI
#### 5-2Jest测试
  - React的测试工具
    - test Utilities：，太过复杂
    - enzyme：airbnb推出的，可以轻松对React组件的输出进行断言、操控、遍历
    - react testing library：react官方推荐，jest-dom：新增了一些断言，
      - mock function 事件处理函数，调用jest.fn()创建一个被监控的func
      - fireEvent触发不同的用户事件：fireEvent.click(element){expect(jest.fun().断言) }
#### 6menu组件
  - 6.1Menu组件
    - 横向/纵向菜单、高亮当前选中菜单active、菜单项可以disabled、是否有下拉菜单、下拉菜单的开合、
    - Menu组件属性和方法（onSelect方法、mode、defaultIndex、className，style：React.CSSPproperties）
    - MenuItem组件属性和方法(index、disabled、className、style：React.CSSPproperties)
    - children可以为任何元素
    - 把父组件的属性传递给子组件useContext（index、onSelect）
    - 控制高亮的index使用useState
    - https://css-tricks.com/讲解css样式
#### 7 icon组件
  - 安装
    - npm i --save @fortawesome/fontawesome-svg-core
    - npm install --save @fortawesome/free-solid-svg-icons
    - npm install --save @fortawesome/react-fontawesome
    
  - 使用方法1：**Individual Use单独使用**，每次都引入很麻烦
     ```react
     import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
     import { faCoffee } from '@fortawesome/free-solid-svg-icons'
     const element = <FontAwesomeIcon icon={faCoffee} />
    ```
    
  - 使用方法2：**Global Use全局使用**，使用build library
     ```react
     import { library } from '@fortawesome/fontawesome-svg-core'
     //fas是svg-icons所有突变
     import { fas } from '@fortawesome/free-solid-svg-icons'
     library.add(fas) //把图标添加到library中
    ```
    
  - 准备ThemeProps
    - ThemeProps：primary|secondary|success|info|warning|danger|light|dark
    - 接口注意要继承原生属性FontAwesomeIconProps
    - 基本class-’laura-icon‘，class的格式'icon-primary'，
    - 要继承原生属性:{...restProps}
    
  - 样式
    
    - sass提供@each规则允许我们循环list或者map
    
      ```scss
      $sizes: 40px, 50px, 80px;
      @each $size in $sizes {
        .icon-#{$size} {
          font-size: $size;
          height: $size;
          width: $size;
        }
      }
      $icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");
      @each $name, $glyph in $icons {
        .icon-#{$name}:before {
          display: inline-block;
          font-family: "Icon Font";
          content: $glyph;
        }
      }
      ```
    
    - CSS**transform**属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的
    
      ```css
      /* Keyword values */
      transform: none;
      /* Function values */
      transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
      transform: translate(12px, 50%);
      transform: translateX(2em);
      transform: translateY(3in);
      transform: scale(2, 0.5);
      transform: scaleX(2);
      transform: scaleY(0.5);
      transform: rotate(0.5turn);
      transform: skew(30deg, 20deg);
      transform: skewX(30deg);
      transform: skewY(1.07rad);
      transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
      transform: translate3d(12px, 50%, 3em);
      transform: translateZ(2px);
      transform: scale3d(2.5, 1.2, 0.3);
      transform: scaleZ(0.3);
      transform: rotate3d(1, 2.0, 3.0, 10deg);
      transform: rotateX(10deg);
      transform: rotateY(10deg);
      transform: rotateZ(10deg);
      transform: perspective(17px);
      /* Multiple function values */
      transform: translateX(10px) rotate(10deg) translateY(5px);
      /* Global values */
      transform: inherit;
      transform: initial;
      transform: unset;
      ```
    
    - css解决不了的事情，下拉菜单渐显渐隐状态（display:none不占用空间，opacity占用空间）
    
      - 原始实现方法：
    
        display:none--->display:block --->动画--->display:block
    
        ​                               opacity:0                            opacity:1
    
        display:block--->动画 --->display:block--->display:none
    
        ​             opacity:1               opacity:0
    
      - 使用ReactTransitionGroup实现：
    
        组件从无到有、从有到无过程添加多个描述组件周期的class
    
        安装npm install react-transition-group --save
    
        安装npm install @types/react-transition-group --save
    
        \*-enter--->force a reflow(动画)--->\*-enter-active--->自定义timeout--->\*-enter-done
    
        \*-exit--->force a reflow(动画)--->\*-exit-active--->自定义timeout--->\*-exit-done
    
        ```css
        .my-node-enter {
          opacity: 0;
        }
        .my-node-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .my-node-exit {
          opacity: 1;
        }
        .my-node-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
        ```
    
  - 动画
    
    - 给下拉菜单添加动画CSSTransition
    
    - 参考animation.css，umountOnExit
    - CSSTransition 的props：in、timeout、animation（className替换此字面量）
    
    

