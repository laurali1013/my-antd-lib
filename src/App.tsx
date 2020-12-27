import React from "react";
import "./App.css";
import LikeButton from "./learn-react-hook/02LikeButton";

interface IThemeProps{
  [key: string]: { color: string; background: string;}
}
const themes: IThemeProps = {
  'light': {
    color:'#000',
    background:'#eee',
  },
  'dark': {
    color:'#fff',
    background:'#222',
  }
}

export const ThemeContext = React.createContext(themes.dark);

function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <LikeButton/>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
