import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions') // Assuming your API is running on the same server
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        console.log(data);
    })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Render quiz UI using the 'questions' state

  return (
    <div className="quiz">
        hi
        {questions.toString()}
    </div>
  );
};

export default Quiz;
