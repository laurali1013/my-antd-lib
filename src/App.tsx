import React from 'react';

import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';

function App() {
  return (
    <>
      <Menu mode='horizontal' defaultIndex={0} onSelect={(index) => {alert(index) }}>
        <MenuItem>11</MenuItem>
        <MenuItem disabled>22</MenuItem>
        <MenuItem>33</MenuItem>
      </Menu>
    </>
  );
}

export default App;
