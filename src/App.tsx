import HomeScreen from "./components/homeScreen.tsx";
import "./styles/index.css";
import todoIcon from "./assets/todo.png";

function App() {
  return (
    <>
      <h1 className="head">
        Task Tracker <img src={todoIcon} alt="X" style={{ height: "3.8rem" }} />
      </h1>
      <HomeScreen />
    </>
  );
}

export default App;
