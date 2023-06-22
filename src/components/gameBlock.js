
import React from 'react';
import { useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

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
  fontSize: '30px', // adjust this as per your needs
  height: '190px',  // adjust this as per your needs
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: "black"
}));

function GameBlock() {
  const [quiz, setQuiz] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [timerKey, setTimerKey] = React.useState(Date.now()); // Add timerKey state
  const [players, setPlayers] = React.useState([]); // Add players state
  const timerDuration = 30; // Initial timer duration
  const { quizId } = useParams();
  const navigate = useNavigate(); 
  const baseUrl = 'https://nat-game.azurewebsites.net';
  const fetchQuiz = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/quiz/${quizId}`);
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/active/quiz/${quizId}/players`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchQuiz();
    fetchPlayers();
  }, [quizId]);

  const handleTimerComplete = () => {
    // Move to the next question if available
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fetchPlayers();
    } else {
      const code = sessionStorage.getItem('ActiveQuiz');
      navigate(`/Top3/${code}`);
    }

    setTimerKey(Date.now()); // Reset the timer by updating timerKey
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      {/* Timer component */}
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

      {/* Game content component */}
      <div className="game-content" style={{ width: '70%' }}>
        <div style={{ padding: "20px", textAlign: "center", fontSize: "2rem", color: "white" }}>
          {currentQuestion.question}
        </div>

        <div className="idk" style={{ padding: '15px' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Object.entries(currentQuestion.answers).map(([key, value], index) => {
              // Define an array of colors
              const colors = ['red', '#4591FF', '#FFB829', '#7DFFBB'];

              // Assign each color to an item based on its index
              const itemStyle = {
                backgroundColor: colors[index],
                width: '100%', // This will make the Item take up the full width of its container (Grid)
                height: '100%',
              };

              return (
                <Grid xs={6} key={key}>
                  <Item style={itemStyle}>{value}</Item>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>

      {/* Players component */}
      <div className="players" style={{ width: '20%', marginRight: '-1rem', background: "#FFB829", padding: "5px" }}>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player.username}: {player.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );


}

export default GameBlock;
