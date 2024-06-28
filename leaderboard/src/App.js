import React, { useState, useEffect } from "react";

function App() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/scores")
      .then((res) => res.json())
      .then((data) => {
        const playersWithSortedScores = Object.keys(data).map((name) => ({
          name: name,
          scores: data[name].sort((a, b) => b - a),
        }));

        playersWithSortedScores.sort((a, b) => b.scores[0] - a.scores[0]);

        setScores(playersWithSortedScores);
      })
      .catch((err) => console.error("Error fetching scores:", err));
  }, []);

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <div className="scoreboard">
        <ul className="score-list">
          {scores.map((player, index) => (
            <li
              key={player.name}
              className={index % 2 === 0 ? "score-item even" : "score-item odd"}
            >
              <span className="player-name">{player.name}</span>
              <span className="player-score">{player.scores.join(", ")}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .scoreboard {
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .score-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .score-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          border-bottom: 1px solid #eee;
        }

        .score-item:last-child {
          border-bottom: none;
        }

        .even {
          background-color: #f9f9f9;
        }

        .odd {
          background-color: #fff;
        }

        .player-name {
          font-weight: bold;
          color: #555;
        }

        .player-score {
          color: #000;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}

export default App;
