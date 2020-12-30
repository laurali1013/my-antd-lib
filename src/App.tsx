import React from 'react';

import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

function App() {
  return (
    <>
      <Menu mode='vertical' defaultIndex={'0'} onSelect={(index) => {alert(index) }} defaultOpenSubMenus={['2']}>
        <MenuItem>11</MenuItem>
        <MenuItem disabled>22</MenuItem>
        <SubMenu title="hello">
          <MenuItem>aaaaa</MenuItem>
          <MenuItem>bbbbb</MenuItem>
          <MenuItem>ccccc</MenuItem>
        </SubMenu>
        <MenuItem>33</MenuItem>
      </Menu>
    </>
  );
}

export default App;
