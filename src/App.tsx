import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Input from './components/Input/Input';

library.add(fas);

function App() {
  return (
    <>
      <Input icon='arrow-down' size='lg'/>
    </>
  );
}

export default App;
