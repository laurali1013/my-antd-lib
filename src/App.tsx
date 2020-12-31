import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon/Icon';

library.add(fas);

function App() {
  return (
    <>
      <Icon icon='arrow-down' theme='danger' size='10x'/>
      <Menu mode='horizontal' defaultIndex={'0'} defaultOpenSubMenus={['2']}>
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
