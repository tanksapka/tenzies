import { useState, useEffect } from "react";
import "./TimeCounter.css";

export default function TimeCounter(props) {
  const { isWon, updateScore } = props;
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    function calcTimeElapsed() {
      if (!props.isWon) {
        setCurrentTime(Date.now() - props.time);
      }
    }
    const myInterval = setInterval(calcTimeElapsed, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [props.isWon, props.time]);

  useEffect(() => {
    isWon && updateScore(currentTime);
  }, [isWon]);

  return (
    <div className="time-counter">
      Time: <span className="time-counter-value">{props.convertTime(currentTime)}</span>
    </div>
  );
}
