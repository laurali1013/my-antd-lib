import { FC, useState, useEffect, useRef,useContext } from "react";
import { ThemeContext } from './../App';

//setState是替换不是合并，所以每次setState都要把该state的内容全部赋值一遍
const LikeButton: FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);
  //定义ref
  const likeRef = useRef(0);
  const didUpdataRef = useRef(false);
  const domRef = useRef<HTMLInputElement>(null);

  //创建context
  const theme = useContext(ThemeContext);
  console.log(theme);
  const style = {
    background: theme.background,
    color:theme.color,
  }
  
  //不需要清除的副作用
  useEffect(() => {
    document.title = `点击了${like}次`;
  }, [like]);
  //实现didComponentUpdate生命周期
  useEffect(() => {
    if (didUpdataRef.current) {
      console.log('update');
    } else {
      didUpdataRef.current = true;
    }
  })
  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus();
    }
  });


  //alert点击处理函数
  function handleAlertClick() {
    setTimeout(() => {
      alert(`you clicked on ${likeRef.current}次`);
    },3000);
  }

  return (
    <>
      <input type="text" ref = {domRef}/>
      <button onClick = {handleAlertClick}>Alert</button>
      <button
        onClick={() => {
          setLike(like + 1);
          likeRef.current++;
        }}
      >
        {like}👍
      </button>
      <button
        onClick={() => {
          setOn(!on);
        }}
      >
        {on ? "ON" : "OFF"}
      </button>
      <p style = {style }>like button测试context</p>
    </>
  );
};

export default LikeButton;
