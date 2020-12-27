import React, { useState }from 'react';
import logo from './logo.svg';
import './App.css';

import MouseTracker from './learn-react-hook/03MouseTracker';
import LikeButton from './learn-react-hook/02LikeButton';
import useMousePosition from './learn-react-hook/04useMousePosition';
import useUrlLoader from './learn-react-hook/05useUrlLoader';

//定义请求成功后的返回数据类型
interface IShowResult{
  message: string;
  status: string;
}

const URL = "https://dog.ceo/api/breeds/image/random";
function App() {
  const [show, setShow] = useState(true);
  //1.获取请求后的数据
  const [data, loading] = useUrlLoader(URL,[show]);
  //2.因为data是any类型，我们需要将其断言为IShowResult类型
  const dogResult = data as IShowResult;


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            加载dog
          </button>
        </p>
        {loading ? <p>🐕🐕读取中</p> : <img src={dogResult && dogResult.message} alt="狗狗照片" />}
        {show && <MouseTracker />}
        <LikeButton />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
