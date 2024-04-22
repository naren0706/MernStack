import React, { useEffect, useState } from "react";
import Question from "./Question";
import Result from "./Result";
// import questions from "./Questions";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions') 
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
    })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);


  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz">
      {showResult ? (
        <Result score={score} />
      ) : (
        questions[currentQuestion] ? (
          <Question
            question={questions[currentQuestion]}
            handleAnswerButtonClick={handleAnswerButtonClick}
          />
        ) : (
          <p>Loading...</p>
        )
      )}
    </div>
  );
  
};

export default Quiz;
