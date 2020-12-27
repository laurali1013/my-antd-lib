import { FC, useEffect, useState } from "react";

const MouseTracker: FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  //副作用
  useEffect(() => {
    //左单击鼠标处理事件
    const updateMouse = (e: MouseEvent) => {
      console.log("inner");
      setPositions({ x: e.clientX, y: e.clientY });
    };
    //添加事件监听
    document.addEventListener("click", updateMouse);
    //下次副作用时，先移除本次的事件监听，重新添加事件监听
    return () => {
      document.removeEventListener("click", updateMouse);
    };
  });

  return (
      <p>X:{positions.x},Y:{positions.y}</p>
  );
};

export default MouseTracker;
