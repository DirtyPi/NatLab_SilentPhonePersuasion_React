import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../baseUrl";
function QuizList() {
    const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`${baseUrl}/api/quiz`);
      const json = await response.json();

      if (response.ok) {
        setQuizzes(json);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    // Call the API to start the quiz
    fetch(`${baseUrl}/api/active/quiz/${quizId}/activate`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Redirect to the Quiz Game page
        navigate(`/ACP/${quizId}`);
      })
      .catch(error => console.log(error));
  };
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid black' }}>
      <h1>Quiz List</h1>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <h3>{quiz.name}</h3>
         
          <button onClick={() => handleStartQuiz(quiz._id)}>Start Quiz</button>
        </div>
      ))}
    </div>
  );
}

export default QuizList;
