import React from "react";
import Todo from "./Todo";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Task App</h1>
      <Todo />
    </div>
  );
};
export default App;
