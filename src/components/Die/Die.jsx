import "./Die.css";

export default function Die(props) {
  return (
    <div className={`die-item ${props.isHeld && "die-held"}`} onClick={() => props.holdDice(props.id)}>
      {props.value}
    </div>
  );
}
