import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    return [...Array(10).keys()].map((x) => generateDie());
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDie();
        })
      );
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.id === id ? { ...oldDie, isHeld: !oldDie.isHeld } : oldDie;
      })
    );
  }

  useEffect(() => {
    const firstValue = dice[0].value;
    if (dice.every((die) => die.isHeld && die.value === firstValue)) {
      setTenzies(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => <Die key={die.id} {...die} holdDice={holdDice} />);

  return (
    <main className="board-container">
      <div className="instructions">
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
