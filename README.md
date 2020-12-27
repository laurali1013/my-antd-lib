# 3-1:react
  - npx是什么？
    - 避免安装全局模块
    - create-react-app下载到临时目录
    - 调用项目内部安装的模块
# 3-5：useState Hook
  - setState是替换不是合并，所以每次setState都要把该state的内容全部赋值一遍
    
# 3-6:useEffect hook
  - useEffect第一个参数是一个函数，第二个参数是依赖，如果为空[],则相当于componentdidmount 
  - useEffect的返回值是一个函数，用于清除上次useEffect的副作用
# 3-13:useRef hook
  - useRef在所有的render中都保持唯一的引用，是取值的最终状态
  - ref修改后，不会重新渲染
  - 可以绑定dom节点
