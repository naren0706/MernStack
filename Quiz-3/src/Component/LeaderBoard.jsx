import React, { useEffect, useState } from "react";
import "./../Styles/LeaderBoard.scss";
import axios from "axios";
function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const leaderboardArray = async () => {
      const responce = await axios.get(`http://localhost:5000/api/LeaderBoard`);
      setLeaders(responce.data);
    };

    leaderboardArray();
  }, []);
  return (
    <div className="leaderboard-container">
      <div className="title leaderboard-title">
        <h1>LeaderBoard</h1>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="message">
        Click to close
      </div>
    </div>
  );
}

export default LeaderBoard;
