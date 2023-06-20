import { useState } from "react";
import HomeScreen from "./homeScreen.tsx";
import "./styles/index.css";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="head"> What's your plan for Today ?</h1>
      <HomeScreen />
    </>
  );
}

export default App;
