import "./TopScores.css";

export default function TopScores(props) {
  const scoreItem = props.scores.map((item, idx) => {
    return <li key={idx}>{item}</li>;
  });

  return (
    <div className="top-scores-container">
      <h3 className="top-scores-title">Top Scores</h3>
      <ol className="top-scores-list">{scoreItem}</ol>
    </div>
  );
}
