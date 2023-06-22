import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
   color: theme.palette.text.secondary,
  //  width: '600px',
  // height: '250px', 
  color: 'black',
  transition: 'transform .2s', 
  '&:active': {
    transform: 'scale(0.95)' 
  },
}));

function PlayerQuiz() {
  const { quizId } = useParams();
  const activeQuiz = sessionStorage.getItem('ActiveQuiz');
  const baseUrl = 'https://nat-game.azurewebsites.net';
  const [aquiz, setAquiz] = useState(null);
  const [aquizcode, setAquizcode] = useState(activeQuiz);
  const [Quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [timerKey, setTimerKey] = React.useState(Date.now()); 
  useEffect(() => {
    const fetchAQuiz = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/active/quiz/code/${aquizcode}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAquiz(data);  // Update `aquiz` with the fetched data
      } catch (error) {
        console.log(error);
      }
    };
  
    if (aquizcode) { // Prevents the effect from running if `aquizcode` is not set
      fetchAQuiz();
    }
  }, [aquizcode]);  // Effect runs when component mounts and whenever `aquizcode` changes
  
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/quiz/${aquiz?.quiz}`);
        const data = await response.json();
        setQuiz(data);
       
      } catch (error) {
        console.log(error);
      }
    }
  
    if(aquiz) { // Ensures `aquiz` is set before running fetchQuiz
      fetchQuiz();
    }
  }, [aquiz]); // Runs whenever `aquiz` changes

  const handleTimerComplete = () => {
    // Move to the next question if available
    if (currentQuestionIndex < Quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Redirect to another page when there are no more questions
      // You can replace '/result' with the desired URL
      window.location.href = 'https://nat-lab-silent-phone-persuasion-react-git-main-dirtypi.vercel.app/result';
    }

    setTimerKey(Date.now()); // Reset the timer by updating timerKey
  };

 
  const [myVariable, setMyVariable] = useState('');

  useEffect(() => {
    // Retrieve the value from localStorage
    const storedValue = localStorage.getItem('username');

    // Set the local variable if a value exists in localStorage
    if (storedValue) {
      setMyVariable(storedValue);
    }
  }, []); // Run the effect only once on component mount



  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }
    return (
      <div className="timer">
        <div className="value"><h1>{remainingTime}</h1></div>
      </div>
    );
  }
   if (!Quiz) {
    return <div style={{background: 'white'}}>Loading...</div>;
  }
  const currentQuestion = Quiz.questions[currentQuestionIndex];

const handleAnswerClick = debounce(async (answerKey) => {
  const playerId = sessionStorage.getItem('userID');
  const url = `${baseUrl}/api/active/quiz/aq/${aquiz._id}/p/${playerId}/qq/${currentQuestion._id}/answer`;
  const body = { answer: answerKey };
  console.log("Active Quiz" + aquiz._id + "Player:" + playerId + "Question id:" + currentQuestion._id);
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // This will log the response from the server
  } catch (error) {
      console.error('There was an error!', error);
  }
}, 1000); // This will make the function wait 1000ms (1 second) between each call.


  return (

    <div className="containerPQ">
      <div classname='idk' style={{ padding: '15px' }}>


      </div>
      <div style={{ padding: '30px', display: 'flex', justifyContent: 'flex-end', width: '250px'}}>
      <div className="timer-wrapper" style={{ background: '#7dffbb', width: '110px', height: '110px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>

        <CountdownCircleTimer
          key={timerKey} // Add key prop to reset the timer
          isPlaying
          duration={30}
          size={100}

          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          // onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          onComplete={handleTimerComplete}
        >
          {renderTime}
        </CountdownCircleTimer>

      </div>
      </div>
     {/* Game content component */}
     <div className="game-content" style={{ width: '70%' }}>
       

        <div className="idk" style={{ padding: '1px', display: 'flex', justifyContent: 'flex-end', width: '290px', height:'100px' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Object.entries(currentQuestion.answers).map(([key, value], index) => {
              // Define an array of colors
              const colors = ['red', '#4591FF', '#FFB829', '#7DFFBB'];
              const answerKey = String.fromCharCode(97 + index);
              // Assign each color to an item based on its index
              const itemStyle = {
                backgroundColor: colors[index],
                width: '100%', 
                height: '100%',
              };

              return (
                <Grid xs={6} key={key}>
                  <Item style={itemStyle} onClick={() => handleAnswerClick(answerKey)}>{value}</Item>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PlayerQuiz;