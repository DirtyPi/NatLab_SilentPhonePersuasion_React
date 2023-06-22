import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import baseUrl from "../baseUrl";
import '../components/componentsCSS/PIN.css';

const PIN = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [code, setCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const baseUrl = 'https://nat-game.azurewebsites.net';
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);
  
  const handleInput = (e, currentIndex) => {
    const currentInput = inputsRef.current[currentIndex];
    const nextInput = inputsRef.current[currentIndex + 1];
    let inputValue = e.target.value;
  
    // Convert to uppercase
    inputValue = inputValue.toUpperCase();
    currentInput.value = inputValue;
  
    if (inputValue.length > 1) {
      currentInput.value = "";
      return;
    }
  
    if (nextInput && inputValue !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }
  
    if (e.key === "Backspace") {
      currentInput.value = "";
      if (currentIndex > 0) {
        inputsRef.current[currentIndex - 1].focus();
      }
    }
  
    const isAllInputsFilled = inputsRef.current.every(input => input.value !== '');
    setIsButtonDisabled(!isAllInputsFilled);
    if (isAllInputsFilled) {
      setCode(inputsRef.current.map((input) => input.value).join(""));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isButtonDisabled) {
      console.log("Button is disabled, can't submit");
      return;
    }
  
    try {
      const response = await axios.get(`${baseUrl}/api/active/quiz/code/${code}`);
      const activeQuiz = response.data;
      // Redirect to the appropriate page based on the active quiz data
      if (activeQuiz) {
        navigate(`/SetUsername/${code}`);
      } else {
        // Incorrect code handling
        console.log("Incorrect code");
      }
    } catch (error) {
      // API error handling
      console.error("API error:", error);
    }
  };
  
  return (
    <div className="containerPin">
      <form >
        <div className="input-field">
          <input
            type="text"
            maxLength="1"
            ref={(el) => (inputsRef.current[0] = el)}
            onKeyUp={(e) => handleInput(e, 0)}
          />
          <input
            type="text"
            maxLength="1"
            disabled
            ref={(el) => (inputsRef.current[1] = el)}
            onKeyUp={(e) => handleInput(e, 1)}
          />
          <input
            type="text"
            maxLength="1"
            disabled
            ref={(el) => (inputsRef.current[2] = el)}
            onKeyUp={(e) => handleInput(e, 2)}
          />
          <input
            type="text"
            maxLength="1"
            disabled
            ref={(el) => (inputsRef.current[3] = el)}
            onKeyUp={(e) => handleInput(e, 3)}
          />
        </div>
        <button className="pinbutton" type="submit" onClick={handleSubmit} disabled={isButtonDisabled}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default PIN;
