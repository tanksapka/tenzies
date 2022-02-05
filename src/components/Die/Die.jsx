import "./Die.css";

export default function Die(props) {
  const dieFace = [...Array(props.value).keys()].map((idx) => <div key={idx} className="dot"></div>);

  return (
    <div
      className={`die-item ${props.isHeld && "die-held"} face-${props.value}`}
      onClick={() => props.holdDice(props.id)}
    >
      {dieFace}
    </div>
  );
}
