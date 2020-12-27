import { FC, useState } from "react";

//setState是替换不是合并，所以每次setState都要把该state的内容全部赋值一遍
const LikeButton: FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setLike(like + 1);
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
    </>
  );
};

export default LikeButton;
