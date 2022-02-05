import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    return [...Array(10).keys()].map((x) => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice(event) {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => <Die key={die.id} value={die.value} />);

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
