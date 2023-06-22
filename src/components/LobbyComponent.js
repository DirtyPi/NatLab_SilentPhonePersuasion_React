import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Lobby() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizItSelf, setQuizItSelf] = useState(null);
  const navigate = useNavigate(); // hook from react-router-dom
  const [user, setUser] = useState(null);
  const baseUrl = 'https://nat-game.azurewebsites.net';
  useEffect(() => {
    // Retrieve the ActiveQuiz data from sessionStorage
    const activeQuizData = sessionStorage.getItem('ActiveQuiz');
    if (activeQuizData) {
      setActiveQuiz({ _id: activeQuizData });
      // Fetch the active quiz data based on the quizId
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/active/quiz/code/${activeQuizData}`);
          const data = await response.json();
          setQuiz(data);
        } catch (error) {
          console.log( "error lol" + error);
        }
      };
     
      fetchQuiz();
      
    }
  }, [quiz]);

 
  useEffect(() => {
    if (activeQuiz) { // Check if activeQuiz is not null
      const username = sessionStorage.getItem('username');
  
      const fetchUser = async () => {
        //console.log('Fetching user:', activeQuiz); // Debugging: log activeQuiz before making the request
        try {
          const response = await fetch(`${baseUrl}/api/active/quiz/${activeQuiz._id}/user/${username}`);
          const data = await response.json();
          //console.log('Fetched user123:', data); // Debugging: log the fetched data
          sessionStorage.setItem('userID', data.userID); // Save userID directly
          // Only update the user state if the fetched data is different from the current user state
          if (JSON.stringify(user) !== JSON.stringify(data)) {
            setUser(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [activeQuiz]);

  useEffect(() => {
    if (quiz) {
      const fetchQuizItSelf = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/quiz/${quiz.quiz}`);
          const data = await response.json();
          setQuizItSelf(data);
        } catch (error) {
          console.log("error lol" + error);
        }
      };

      fetchQuizItSelf();
    }
  }, [quiz]);

  // Check if the current time is past the start time of the quiz
  useEffect(() => {
    const checkStartTime = setInterval(() => {
      if (new Date().getTime() > new Date(quiz?.startTime).getTime()) {
        navigate(`/quizplayer/${quiz.code}/${quiz.quiz}`); // redirect to the new component
      }
    }, 1000); // check every second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(checkStartTime);
  }, [quiz, navigate]);


  return (
    <div style={{ backgroundColor: 'white' }}>
      <h1>Lobby</h1>
      <p style={{ backgroundColor: 'white' }}>
        {quizItSelf && (
          <span>
          Quiz Title: {quizItSelf.name}
          The game is about to start!
          </span>
        
        )}
      </p>
    </div>
  );
}

export default Lobby;
