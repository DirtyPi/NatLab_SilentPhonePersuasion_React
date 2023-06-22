// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import baseUrl from "../baseUrl";
// import cors from 'cors';
// function QuizList() {
//     const navigate = useNavigate();
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       const response = await fetch(`/api/quiz`);
//       const json = await response.json();

//       if (response.ok) {
//         setQuizzes(json);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const handleStartQuiz = (quizId) => {
//     // Call the API to start the quiz
//     fetch(`/api/active/quiz/${quizId}/activate`, { method: 'POST' })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         // Redirect to the Quiz Game page
//         navigate(`/ACP/${quizId}`);
//       })
//       .catch(error => console.log(error));
//   };
//   return (
//     <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid black' }}>
//       <h1>Quiz List</h1>
//       {quizzes.map((quiz) => (
//         <div key={quiz._id}>
//           <h3>{quiz.name}</h3>
         
//           <button onClick={() => handleStartQuiz(quiz._id)}>Start Quiz</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default QuizList;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import baseUrl from "../baseUrl";
import cors from 'cors';

function QuizList() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false); // New state variable

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch(`/api/quiz`);
            const json = await response.json();

            if (response.ok) {
                setQuizzes(json);
            }
        };

        fetchQuizzes();
    }, []);

    const handleStartQuiz = debounce((quizId) => {
        // Disable the button
        setButtonDisabled(true);

        // Call the API to start the quiz
        fetch(`/api/active/quiz/${quizId}/activate`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Redirect to the Quiz Game page
                navigate(`/ACP/${quizId}`);
            })
            .catch(error => console.log(error))
            .finally(() => {
                // Enable the button after request is completed
                setButtonDisabled(false);
            });
    }, 500, { leading: true, trailing: false }); // Apply debounce

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid black' }}>
            <h1>Quiz List</h1>
            {quizzes.map((quiz) => (
                <div key={quiz._id}>
                    <h3>{quiz.name}</h3>
                
                    <button onClick={() => handleStartQuiz(quiz._id)} disabled={buttonDisabled}>Start Quiz</button>
                </div>
            ))}
        </div>
    );
}

export default QuizList;
