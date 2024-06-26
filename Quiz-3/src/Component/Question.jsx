import React from "react";
import "./../Styles/Questions.scss";
const Question = ({ question, handleAnswerButtonClick }) => {
  return (
    <div className="question-answer">
      <div className="question">
        <h2>{question.questionText}</h2>
      </div>
      <div className="answer-options">
        {question.answerOptions.map((answerOption, index) => (
          <button
            key={index}
            onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
