

import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import '../components/componentsCSS/PIN.css';

const PIN = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleInput = (e, currentIndex) => {
    const currentInput = inputsRef.current[currentIndex];
    const nextInput = inputsRef.current[currentIndex + 1];
    const prevInput = inputsRef.current[currentIndex - 1];

    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (e.key === "Backspace") {
      inputsRef.current.forEach((input, index) => {
        if (currentIndex <= index && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    if (!inputsRef.current[3].hasAttribute("disabled") && inputsRef.current[3].value !== "") {
      buttonRef.current.classList.add("active");
      setCode(inputsRef.current.map((input) => input.value).join(""));
    } else {
      buttonRef.current.classList.remove("active");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}/api/code/${code}`);
      const activeQuiz = response.data;
      // Redirect to the appropriate page based on the active quiz data
      if (activeQuiz) {
        navigate("/quiz");
      } else {
        // Incorrect code handling
        console.log("Incorrect code");
      }
    } catch (error) {
      // API error handling
      console.log("API error:", error);
    }
  };

  return (
    <div className="containerPin">
      <form onSubmit={handleSubmit}>
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
        <button className="pinbutton" type="submit" disabled ref={buttonRef}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default PIN;