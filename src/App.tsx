import React from 'react';
import Button from './components/Button/Button';

function App() {
  return (
    <>
      <Button>Default Button</Button>
      <Button btnType="primary">Primary Button</Button>
      <Button btnType="danger" onClick={() => console.log("hello")}>Danger Button</Button>
      <Button btnType="link" href="http://www.w3school.com.cn">
        Link Button
      </Button>
      <p>--</p>
      <Button disabled>Disabled Button</Button>
      <Button className="disabled" btnType="link">
        Disabled Link Button
      </Button>
      <p>--</p>
      <Button size="lg">Large Button</Button>
      <Button size="sm">Small Button</Button>
    </>
  );
}

export default App;
