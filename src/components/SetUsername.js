// import React, { useState, useEffect , useRef} from 'react';
// import popSound  from '../sound/Signal.mp3'
// import popSoundOGG  from '../sound/Signal.ogg'
// import { Howl, Howler } from 'howler'; // Import Howler library
// import '../components/componentsCSS/setUsername.css'
// import { Label } from '@mui/icons-material';



// const Username = () => {
//     const [username, setUsername] = useState('');
//     const [isButtonClickable, setIsButtonClickable] = useState(false);
  
//     const usernameInputRef = useRef(null);
//     const submitButtonRef = useRef(null);
    
//     const [showPopup, setShowPopup] = useState(false);
   
 
    
//     useEffect(() => {
//       // Check if pop-up message has already been displayed
//       const hasShownPopup = sessionStorage.getItem('hasShownPopup');
//       if (!hasShownPopup) {
//           // Display pop-up message
//           setShowPopup(true);
//           // Store that pop-up message has been displayed
//           sessionStorage.setItem('hasShownPopup', true);
//       }
      
//   }, []);

//     useEffect(() => {
//         usernameInputRef.current.focus();
//       }, []);
    
//       useEffect(() => {
//         const storedUsername = sessionStorage.getItem('username');
//         if (storedUsername) {
//           setUsername(storedUsername);
//         }
//       }, []);
    
//       useEffect(() => {
//         if (username.length > 4) {
//           setIsButtonClickable(true);
//         } else {
//           setIsButtonClickable(false);
//         }
//       }, [username]);

     
    
//       const handleInputChange = (event) => {
//         setUsername(event.target.value);
//       };
    
//       const handleSubmit = (event) => {
//         event.preventDefault();
//         // Store the username in the session
//         sessionStorage.setItem('username', username);
//         console.log(`Username: ${username}`);
//       };

//       const handlePopupClose = () => {
//         // Play the sound when the popup is closed
//         const sound = new Howl({
//           src: [popSound, popSoundOGG],
//           volume: 0.5,
//         });
//         sound.play();
    
//         setShowPopup(false);
//       };

    
// return(
//   <>
//     {showPopup ? (
//       <div className="popup" onClick={() => setShowPopup(false)}>
//         <p>Attention cinema-goers! For a more immersive and enjoyable experience, we kindly ask that you turn off or 
//           turn down the volume of your mobile phone. Thank you for your cooperation!</p>
//         <button className="popup-button" onClick={handlePopupClose}>Close</button>
       
//       </div>
//     ) : (
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={handleInputChange} ref={usernameInputRef} />
//         </label>
//         <button type="submit" className={isButtonClickable ? 'setUsernameBtn active' : 'setUsernameBtn'} ref={submitButtonRef}>
//           <a href="/quizplayer" style={{textdecoration:'none', color:'black',  textDecoration: 'none'}}>
//           Submit
//         </a></button>
//       </form>
//     )}
//   </>
// )};

// export default Username;



import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import '../components/componentsCSS/setUsername.css';
import popSound from '../sound/Signal.mp3';
import popSoundOGG from '../sound/Signal.ogg';
import { useParams } from 'react-router-dom';
import baseUrl from "../baseUrl";
const Username = () => {
  const [username, setUsername] = useState('');
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  
  const usernameInputRef = useRef(null);
  const submitButtonRef = useRef(null);

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
  const [quiz, setQuiz] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length > 3) {
      sessionStorage.setItem('username', username);
      console.log(`Username: ${username}`);

      try {
        const response = await fetch(`/api/active/quiz/signin/${secondLastParam}`, {
          method: 'POST',
          body: JSON.stringify({ username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          
          navigate(`/quizplayer`);
        } else {
          console.log('API Error:', response.status);
        }
      } catch (error) {
        console.log('Network Error:', error);
      }
    }
  };

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
            Attention cinema-goers! For a more immersive and enjoyable experience, we kindly ask that you turn off or
            turn down the volume of your mobile phone. Thank you for your cooperation!
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
            ref={submitButtonRef} 
          >
            <a href="/quizplayer" style={{ textDecoration: 'none', color: 'black', textDecoration: 'none' }}>
              Submit
            </a>
          </button>
        </form>
      )}
    </>
  );
};

export default Username;
