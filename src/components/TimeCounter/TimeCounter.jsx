import { useEffect, useState } from "react";
import "./TimeCounter.css";

export default function TimeCounter(props) {
  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    function calcTimeElapsed() {
      if (!props.isWon) {
        const elapsedTime = Date.now() - props.time;
        const isoString = new Date(elapsedTime).toISOString();
        setCurrentTime(isoString.substring(14, 19));
      }
    }
    const myInterval = setInterval(calcTimeElapsed, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [props.isWon, props.time]);

  return (
    <div className="time-counter">
      Time: <span className="time-counter-value">{currentTime}</span>
    </div>
  );
}
