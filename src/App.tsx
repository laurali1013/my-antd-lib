import React, { useState }from 'react';
import logo from './logo.svg';
import './App.css';

import MouseTracker from './learn-react-hook/03MouseTracker';
import LikeButton from './learn-react-hook/02LikeButton';
import useMousePosition from './learn-react-hook/04useMousePosition';

function App() {
  const [show, setShow] = useState(true);
  const positions = useMousePosition();
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
            toggle tracker
          </button>
        </p>
        {show && <MouseTracker />}
        <p>
          X:{positions.x},Y:{positions.y}
        </p>
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
