// import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// import image from '../Images/whale.jpg'
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Unstable_Grid2';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';


// const renderTime = ({ remainingTime }) => {
//         if (remainingTime === 0) {
//           return <div className="timer">Too late...</div>;
//         }
//         return (
//             <div className="timer">
//               {/* <div className="text"></div> */}
//               <div className="value"><h1>{remainingTime}</h1></div>
//               {/* <div className="text"></div> */}
//             </div>
//           );
// }
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// function gameBlock(){
//     return (
//         <div className="App">
         
          
//           <div className='quiz' >
//             <div style={{display: 'flex', justifyContent: 'center'}}>
//             <h1 style={{color:'white', padding:'5px'}}>In the movie The Whale, which character is played by Brandan Fraser?</h1>
//             </div>
//             <div style={{display: 'flex', justifyContent: 'center' ,margintop: '25px'}}>
//             <img src={image} width="500" height="350"  />
//             </div>
//             <div classname='idk' style={{padding: '15px'}}>
           
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         <Grid xs={6} style={{color:'#FCS18A'}}>
//           <Item classname= '1'style={{background:'#FCS18A'}} >1</Item>
//         </Grid>
//         <Grid xs={6} classname= '2' style={{color:'#4591FF'}}>
//           <Item >2</Item>
//         </Grid>
//         <Grid xs={6} classname= '3' style={{color:'#FFB829'}}>
//           <Item >3</Item>
//         </Grid>
//         <Grid xs={6} classname= '4' style={{color:'#7DFFBB'}}>
//           <Item >4</Item>
//         </Grid>
//       </Grid>
  
//             </div>
//             <div className="timer-wrapper" style={{background:'#7dffbb', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',marginRight:'50%'}}>

// <CountdownCircleTimer
//   isPlaying
//   duration={60}
//   size={100} 
//   colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
//   colorsTime={[10, 6, 3, 0]}
//   onComplete={() => ({ shouldRepeat: true, delay: 1 })}
// >
//   {renderTime}
// </CountdownCircleTimer>
// </div>
//           </div>
        
         
//         </div>
        
//       );
// }

// export default gameBlock

import { useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import baseUrl from "../baseUrl";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function GameBlock() {
  const [quiz, setQuiz] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [timerKey, setTimerKey] = React.useState(Date.now()); // Add timerKey state
  const timerDuration = 30; // Initial timer duration

  const { quizId } = useParams();
  

  React.useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [quizId]);
  

  const handleTimerComplete = () => {
    // Move to the next question if available
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Redirect to another page when there are no more questions
      // You can replace '/result' with the desired URL
      window.location.href = '/result';
    }

    setTimerKey(Date.now()); // Reset the timer by updating timerKey
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="App">
      <div className="quiz">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', padding: '5px' }}>
            {currentQuestion.question}
           
          </h1>
        </div>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margintop: '25px',
          }}
        >
          <img src={image} width="500" height="350" />
        </div> */}
        <div className="idk" style={{ padding: '15px' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Object.entries(currentQuestion.answers).map(([key, value]) => (
              <Grid xs={6} key={key}>
                <Item>{value}</Item>
              </Grid>
            ))}
          </Grid>
        </div>
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
            marginRight: '50%',
          }}
        >
          <CountdownCircleTimer
            key={timerKey} // Add key prop to reset the timer
            isPlaying
            duration={timerDuration}
            size={100}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 6, 3, 0]}
            onComplete={handleTimerComplete}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
}

export default GameBlock;

