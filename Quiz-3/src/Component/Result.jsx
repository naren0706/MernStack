import React, { useEffect } from "react";
import axois from "axios";

import "./../Styles/Celebrate.scss";
const Result = ({ score }) => {
  useEffect(() => {
    const userName = sessionStorage.getItem("user");
    const reqBody = {
      _id: userName,
      score: score,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };

    const fetchData = async () => {
      try {
        const responce = await axois.post(
          "http://localhost:5000/api/results",
          reqBody
        );
        console.log(responce);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    sessionStorage.clear();
  }, [score]);

  return (
    <div className="result">
      <div class="confetti">
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="score">
          <h2>Your Score: {score}</h2>
        </div>
      </div>
    </div>
  );
};

export default Result;
