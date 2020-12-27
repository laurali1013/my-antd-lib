import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  //副作用
  useEffect(() => {
    console.log("add effect", positions.x);

    //左单击鼠标处理事件
    const updateMouse = (e: MouseEvent) => {
      console.log("inner");
      setPositions({ x: e.clientX, y: e.clientY });
    };
    //添加事件监听
    document.addEventListener("mousemove", updateMouse);
    //下次副作用时，先移除本次的事件监听，重新添加事件监听
    return () => {
      console.log("remove effect", positions.x);
      document.removeEventListener("mousemove", updateMouse);
    };
  }, []);
    return positions;
};

export default useMousePosition;