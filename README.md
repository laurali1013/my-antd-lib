# 2-1：学习typescript
  - 任何可以使用javascript来编写的优秀的大型应用，最终会由typescript编写
  - 为什么要用typescript？
    - javascript是弱类型(只有var let const)
    - javascript是动态类型语言：只有程序在执行的过程中，才会进行语法检查
    - typescript是强类型(增加了数据类型)
    - typescript是混合型语言：提供静态类型风格的类型系统(程序在编写的过程中，就会对语法检查)
    - typescript支持es6-es10，支持全部浏览器
# 2-2：为什么使用typescript
  - 程序更容易理解：函数或者方法输入和输入的参数类型
  - 动态语言的约束：需要手动调试等过程
  - 效率高：在代码块间跳转、代码补全等功能
  - 完全兼容javascript
  - 第三方库比较全
# 2-3：安装typescript
  - nvm可以安装多个nodejs版本号
  - npm install -g typescript 安装typescript
  - tsc -v 查看typescript安装版本
  - npm install -g ts-node调试ts文件使用
  - tsnode -v 查看ts-node版本号
  - npx create-react-app my-antd-lib 
  --template 

# 2-7:interface类型
  - 对对象的shape进行描述
  - 对类class进行抽象
  - Duck Typing鸭子类型

# 2-9:class
  - 类：定义了一切事物的特点
  - 对象：类的实例
  - 面向对象oop三大特性：
    - 封装：将数据操作细节隐藏，只提供对外接口
    - 继承：子类继承父类
    - 多态：多个继承的类，可以重写方法

# 3-1:react
  - npx是什么？
    - 避免安装全局模块
    - create-react-app下载到临时目录
    - 调用项目内部安装的模块
    
