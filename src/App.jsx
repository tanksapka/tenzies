import "./App.css";
import { useState } from "react";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    return [...Array(10).keys()].map((x) => Math.ceil(Math.random() * 6));
  }

  function rollDice(event) {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die, idx) => <Die key={idx} value={die} />);

  return (
    <main className="board-container">
      <div className="dice-container">{diceElements}</div>
      <button className="dice-roll" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
