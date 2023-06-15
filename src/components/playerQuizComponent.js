import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import sound from '../sound/Signal.mp3'
import baseUrl from "../baseUrl";
function PlayerQuiz() {

  // useEffect(() => {
  //   const audio = new Audio(sound);
  //   audio.loop = true;
  //   audio.play();
  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, []);
 
  const { quizId } = useParams();
  const [aquiz, setAquiz] = useState(null);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/active/quiz/code/${quizId}`);
        const data = await response.json();
        setAquiz(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const [myVariable, setMyVariable] = useState('');

  useEffect(() => {
    // Retrieve the value from localStorage
    const storedValue = localStorage.getItem('username');

    // Set the local variable if a value exists in localStorage
    if (storedValue) {
      setMyVariable(storedValue);
    }
  }, []); // Run the effect only once on component mount

  // Update localStorage and the local variable
  const updateVariable = (value) => {
    localStorage.setItem('myVariable', value);
    setMyVariable(value);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/active/quiz/${aquiz._id}/players/username/${myVariable}/userid`);
        const data = await response.json();
        setAquiz(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [quizId]);
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
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

     
    
  return (
    
    <div className="containerPQ">
      <div classname='idk' style={{padding: '15px'}}>
        
       
                 </div>
                 <div className="timer-wrapper" style={{ background:'#7dffbb', width: '110px', height: '110px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '50px'}}>

            <CountdownCircleTimer
              isPlaying
              duration={60}
              size={100}
               
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>

          </div>
          <div class="rendom" style={{ padding:'10px'}}>
          <Box sx={{ height: 150, width: '100%' , border: '10px'}}>
      <Box
      //answer box 1 
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
         <input type='submit'   value={1} style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'red' }}></input>
      </Box>
      <Box
       //answer box 2
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit'  value={2}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent', backgroundColor:'#4591FF' }}></input>
      </Box>
      <Box
       //answer box 3
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit'  value={3}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#FFB829'}}></input>
      </Box>
      <Box
       //answer box 4
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit'  value={4}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#7DFFBB'}}></input>
      </Box>
    </Box>
          </div>
    </div>
  );
};

export default PlayerQuiz;