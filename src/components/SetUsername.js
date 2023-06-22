

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Howl } from 'howler';
import '../components/componentsCSS/setUsername.css';
import popSound from '../sound/Signal.mp3';
import popSoundOGG from '../sound/Signal.ogg';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';

const Username = () => {
  const [username, setUsername] = useState('');
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  
  const usernameInputRef = useRef(null);
  //const submitButtonRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  // Get the quizId from the URL parameters
  const { quizId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  
  // Extract the parameters from the URL
  const params = pathname.split('/');
  const secondLastParam = params[params.length - 1]; // Access the parameter before the last one

  // State to store the quiz data
  const [quiz, setQuiz] = useState(null);// eslint-disable-line no-unused-vars

 // Fetch the quiz data based on the quizId
useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/active/quiz/code/${quizId}`);
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchQuiz();
}, [quizId]);
  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      setShowPopup(true);
      sessionStorage.setItem('hasShownPopup', true);
    }
  }, []);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (username.length > 4) {
      setIsButtonClickable(true);
    } else {
      setIsButtonClickable(false);
    }
  }, [username]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (username.length > 3) {
//       sessionStorage.setItem('username', username);
//   sessionStorage.setItem('ActiveQuiz', secondLastParam);
//   console.log(`Username: ${username}`);
//   console.log(`ActiveQuiz: ${secondLastParam}`);
//  // console.log(`ActiveQuiz (from storage, right after setting): ${sessionStorage.getItem('ActiveQuiz')}`);
  
//       try {
//         const response = await fetch(`/api/active/quiz/signin/${secondLastParam}`, {
//           method: 'POST',
//           body: JSON.stringify({ username }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
  
//         if (response.ok) {
//           console.log(response);
//           await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
//           navigate(`/Lobby/${secondLastParam}`);
//         } else {
//           console.log('API Error:', response.status);
//         }
//       } catch (error) {
//         console.log('Network Error:', error);
//       }
//     }
//   };
const handleSubmit = debounce(async (event) => {
  event.preventDefault();
  if (username.length > 3) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('ActiveQuiz', secondLastParam);
    console.log(`Username: ${username}`);
    console.log(`ActiveQuiz: ${secondLastParam}`);

    try {
      const response = await fetch(`/api/active/quiz/signin/${secondLastParam}`, {
        method: 'POST',
        body: JSON.stringify({ username }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(response);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        navigate(`/Lobby/${secondLastParam}`);
      } else {
        console.log('API Error:', response.status);
      }
    } catch (error) {
      console.log('Network Error:', error);
    }
  }
}, 500, { leading: true, trailing: false }); // Apply debounce

  const handlePopupClose = () => {
    const sound = new Howl({
      src: [popSound, popSoundOGG],
      volume: 0.5,
    });
    sound.play();

    setShowPopup(false);
  };

  return (
    <>
      {showPopup ? (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <p>
          Attention cinema-goers! For a more immersive and enjoyable experience, we kindly ask that you turn off or turn down the volume 
          of your mobile phone. Please note that if these instructions are not followed, your phone may automatically start playing a sound to 
          remind you. We greatly appreciate your cooperation in creating a distraction-free environment. Thank you!
          </p>
          <button className="popup-button" onClick={handlePopupClose}>
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        <label style={{ color: 'white' }}>
          Type a username:
          <input type="text" value={username} onChange={handleInputChange} ref={usernameInputRef} />
        </label>
        <button
          type="submit"
          className={isButtonClickable ? 'setUsernameBtn active' : 'setUsernameBtn'}
          // ref={submitButtonRef}
        >
          <a  style={{color: 'black' }}>
            Submit
          </a>
        </button>
      </form>
      
      )}
    </>
  );
};

export default Username;
