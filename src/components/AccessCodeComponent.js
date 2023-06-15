
   
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import QRCode from 'react-qr-code';
import baseUrl from "../baseUrl";
const ACC = () => {
  // Hook to manage navigation
  const navigate = useNavigate();

  // Get the quizId from the URL parameters
  const { quizId } = useParams();

  // State to store the quiz data
  const [quiz, setQuiz] = useState(null);

  // Fetch the quiz data based on the quizId
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/active/quiz/quizid/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Redirect to the Quiz Game page after 60 seconds
  useEffect(() => {
    const redirectTimeout = setTimeout(async () => {
      navigate(`/quizgame/${quizId}`);
      if (quiz) {
        try {
          // Make the API call to update the gameStarted field
          const response = await fetch(`/api/active/quiz/${quiz._id}/start-game`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            // API call was successful
            setQuiz((prevQuiz) => ({
              ...prevQuiz,
              gameStarted: true,
            }));
          } else {
            // API call failed
            console.error('Failed to update gameStarted field');
          }
        } catch (error) {
          console.error('Failed to call the API:', error);
        }
      }
    }, 60000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate, quizId]);

 // Function to start the game by calling the API
 const startGame = async () => {
  try {
    // Make the API call to update the gameStarted field
    const response = await fetch(`/api/active/quiz/${quiz._id}/start-game`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // API call was successful
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        gameStarted: true,
      }));
    } else {
      // API call failed
      console.error('Failed to update gameStarted field');
    }
  } catch (error) {
    console.error('Failed to call the API:', error);
  }
};
  // Render function for the countdown timer
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      
      return <div className="timer">Too late...</div>;
    }
    return (
      <div className="timer">
        <div className="value">
          <h1>{remainingTime}</h1>
        </div>
      </div>
    );
  };
  
  // If quiz data is not loaded yet, show a loading message
  if (!quiz) {
    return <div style={{ background: 'white' }}>Loading...</div>;
  }

  // Render the component
  return (
    <div className="App">
      {/* Countdown timer */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          className="timer-wrapper"
          style={{
            background: '#7dffbb',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
          }}
        >
          <CountdownCircleTimer
            isPlaying
            duration={60}
            size={100}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>

      {/* QR code */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px', padding: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'white' }}>Scan me</h2>
        </div>
        <QRCode size={170} value={`SetUsername/${quiz.code}`} />
      </div>
{/* 
      Join code
      <div className="join-text" style={{ display: 'flex', justifyContent: 'center' }}>
        <h2 style={{ color: 'white' }}>Or type code to enter the quiz game.</h2>
      </div>
      <div className="join-code" style={{ display: 'flex', justifyContent: 'center', fontSize: '30px' }}>
        <h1 style={{ color: 'white' }}>{quiz.code}</h1>
      </div> */}
    </div>
  );
};

export default ACC;
