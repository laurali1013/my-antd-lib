import React, { useState }from 'react';
import logo from './logo.svg';
import './App.css';

import MouseTracker from './learn-react-hook/03MouseTracker';
import LikeButton from './learn-react-hook/02LikeButton';

function App() {
  const [show, setShow] = useState(true);
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
