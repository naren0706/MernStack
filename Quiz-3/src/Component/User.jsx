import React, { useState } from "react";
import axios from "axios";

import "./../Styles/User.scss";
import { useNavigate } from "react-router-dom";
import leaderboardImage from "./../assets/leaderboard.svg";
import LeaderBoard from "./LeaderBoard";
function User() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [leaderBoardActive, setLeaderBoardActive] = useState(false);
  //get the name from the input box
  const handleChange = (e) => {
    setName(e.target.value);
    const styles = [];
    for (let index = 0; index < 10; index++) {
      styles.push("style" + index);
    }
    setStyle(styles[Math.floor(Math.random() * styles.length)]);
  };
  //check the name is available in the backend or not
  const isNameAvailable = async () => {
    const responce = await axios.get(
      `http://localhost:5000/api/GetUser?id=${name}`
    );

    if (responce.data.message) {
      setName("");
      alert("This name already exists! Please try another one");
    } else {
      console.log("Valid Name!");
      sessionStorage.setItem("user", name);
      navigate("Quiz");
    }
  };
  //user going to take test !
  const handleSubmit = () => {
    isNameAvailable(name);
  };

  return (
    <div className="main-container">
      <div
        className={leaderBoardActive ? "active" : "leaderboard"}
        onClick={() => setLeaderBoardActive(!leaderBoardActive)}
      >
        {leaderBoardActive ? (
          <LeaderBoard />
        ) : (
          <img src={leaderboardImage} className="leaderboard-image" />
        )}
      </div>
      <div className="user-container">
        <div className="title">
          <h1>Quiz Application</h1>
        </div>
        <div className="instruction">
          <ul>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore,
              repudiandae autem! Excepturi, animi? Nam explicabo ullam earum
              fugiat nisi voluptates libero, eius natus assumenda ipsa vel enim
              repellat maiores quis.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Inventore tempore cumque aspernatur! Velit officia quia hic harum
              autem tempora, facere porro, itaque temporibus laborum totam
              nostrum placeat enim ut cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Pariatur, impedit. Voluptas incidunt, corrupti repudiandae
              necessitatibus cupiditate cumque quaerat soluta earum quia
              deleniti. Consectetur quaerat rem expedita, sit ad facilis magnam!
            </li>
          </ul>
        </div>
        <div className="inputs">
          <label htmlFor="Name">Enter Your Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
            className={"input-name " + style}
            value={name}
            onChange={handleChange}
          />
          {/* <Link to={"Quiz"}> */}
          <button
            type="submit"
            className="submit-btn btn"
            onClick={handleSubmit}
          >
            Take Test !
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default User;
