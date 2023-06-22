import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = 'https://nat-game.azurewebsites.net';
  useEffect(() => {
    // Retrieve the quiz code from local storage
    const quizCode = sessionStorage.getItem('ActiveQuiz');

    // Make sure the quiz code exists
    if (!quizCode) {
      console.error('Quiz code not found in session storage');
      return;
    }

    // Make a GET request to the server
    fetch(`${baseUrl}/api/active/quiz/top-players/${quizCode}`)
      .then(response => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        return response.json();
      })
      .then(data => {
        // Use the data (array of top three players)
        setPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        // Log any errors
        console.error('Failed to fetch top three players:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ backgroundColor: 'white' }}>Error: {error.message}</div>;
  }
  if (players.length === 0) {
    return <div style={{ backgroundColor: 'white' }}>No winners yet!</div>;
  }

  return (
    <div>
  <h2 style={{color: 'white'}}>Leaderboard</h2>
  {players.map((player, index) => {
    let color;
    switch (index) {
      case 0:
        color = 'gold';
        break;
      case 1:
        color = 'silver';
        break;
      case 2:
        color = '#cd7f32'; // bronze
        break;
      default:
        color = 'white';
        break;
    }
    
    return (
      <div key={index} style={{ backgroundColor: color, padding:'15px' }}>
        <h3>#{index + 1}: {player.username}</h3>
        <p>Score: {player.score}</p>
      </div>
    );
  })}
</div>
  );
}

export default Leaderboard;
