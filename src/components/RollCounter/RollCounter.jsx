import "./RollCounter.css";

export default function RollCounter(props) {
  return (
    <div className="roll-counter">
      Rolls: <span className="roll-counter-value">{props.rolls}</span>
    </div>
  );
}
