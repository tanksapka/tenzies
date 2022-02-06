import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die/Die";
import RollCounter from "./components/RollCounter/RollCounter";
import TimeCounter from "./components/TimeCounter/TimeCounter";
import TopScores from "./components/TopScores/TopScores";

function convertTime(intValue) {
  /* Support function to generate srting representation of integer elapsed time value */
  const isoString = new Date(intValue).toISOString();
  return isoString.substring(14, 19);
}

function App() {
  const defaultGameStats = () => ({ isWon: false, rolls: 0, time: Date.now() });
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(defaultGameStats());
  const [scores, setScores] = useState(() => JSON.parse(localStorage.getItem("tenziesScores")) || []);

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
    if (tenzies.isWon) {
      setTenzies(defaultGameStats());
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDie();
        })
      );
      setTenzies((oldTenzies) => ({
        ...oldTenzies,
        rolls: oldTenzies.rolls + 1,
      }));
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
      setTenzies((oldTenzies) => ({
        ...oldTenzies,
        isWon: true,
      }));
    }
  }, [dice]);

  function updateScore(newTime) {
    setScores((oldScores) => {
      const newScores = [...oldScores];
      newScores.push(newTime);
      newScores.sort((a, b) => a - b);
      return newScores.slice(0, 5);
    });
  }

  useEffect(() => localStorage.setItem("tenziesScores", JSON.stringify(scores)));

  const diceElements = dice.map((die) => <Die key={die.id} {...die} holdDice={holdDice} />);

  return (
    <main className="board-container">
      <div className="instructions">
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
      </div>
      <div className="stat-container">
        <RollCounter {...tenzies} />
        <TimeCounter {...tenzies} updateScore={updateScore} convertTime={convertTime} />
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-roll" onClick={rollDice}>
        {tenzies.isWon ? "New Game" : "Roll"}
      </button>
      <TopScores scores={scores.map((item) => convertTime(item))} />
      {tenzies.isWon && <Confetti />}
    </main>
  );
}

export default App;
