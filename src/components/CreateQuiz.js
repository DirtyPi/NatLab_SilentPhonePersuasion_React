import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setQuizTitle(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: {
        ...updatedQuestions[questionIndex].answers,
        [answerIndex]: event.target.value,
      },
    };
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      correct: answerIndex,
    };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, { question: '', answers: { a: '', b: '', c: '', d: '' }, correct: '' }]);
    }
  };

  const handleSaveQuiz = async () => {
    if (questions.length < 10) {
      setErrorMessage('Please add 10 questions before saving the quiz.');
      return;
    }

    for (const question of questions) {
      if (question.question.trim() === '') {
        setErrorMessage('Please provide a question for all inputs.');
        return;
      }

      for (const answerKey of Object.keys(question.answers)) {
        const answer = question.answers[answerKey];
        if (answer.trim() === '') {
          setErrorMessage('Please provide an answer for all inputs.');
          return;
        }
      }

      if (!question.correct) {
        setErrorMessage('Please select the correct answer for all questions.');
        return;
      }
    }

    if (quizTitle.trim() === '') {
      setErrorMessage('Please provide a title for the quiz.');
      return;
    }

    try {
      const formattedQuestions = questions.map((question) => ({
        question: question.question,
        answers: { ...question.answers },
        correct: question.correct,
      }));

      const quizData = {
        name: quizTitle,
        questions: formattedQuestions,
      };

      const response = await axios.post('/api/quiz', quizData);

      console.log('Quiz saved:', response.data);

      setQuizTitle('');
      setQuestions([]);
      setErrorMessage('');

      navigate('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
      setErrorMessage('Failed to save the quiz. Please try again.');
    }
  };

  const handleCancelQuiz = () => {
    if (window.confirm('Are you sure you want to cancel creating the quiz?')) {
      setQuizTitle('');
      setQuestions([]);
      setErrorMessage('');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid black' }}>
      <h2>Create Quiz</h2>

      <div>
        <label>Quiz Title:</label>
        <input type="text" value={quizTitle} onChange={handleTitleChange} />
      </div>

      <h3>Questions:</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <label>Question {index + 1}:</label>
          <input type="text" value={question.question} onChange={(event) => handleQuestionChange(event, index)} />

          <h4>Answers:</h4>
          <div>
            <label>Answer A:</label>
            <input
              type="text"
              value={question.answers.a}
              onChange={(event) => handleAnswerChange(event, index, 'a')}
            />
          </div>
          <div>
            <label>Answer B:</label>
            <input
              type="text"
              value={question.answers.b}
              onChange={(event) => handleAnswerChange(event, index, 'b')}
            />
          </div>
          <div>
            <label>Answer C:</label>
            <input
              type="text"
              value={question.answers.c}
              onChange={(event) => handleAnswerChange(event, index, 'c')}
            />
          </div>
          <div>
            <label>Answer D:</label>
            <input
              type="text"
              value={question.answers.d}
              onChange={(event) => handleAnswerChange(event, index, 'd')}
            />
          </div>

          <div>
            <label>Correct Answer:</label>
            <select value={question.correct} onChange={(event) => handleCorrectAnswerChange(index, event.target.value)}>
              <option value="">Select Correct Answer</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>

          <hr />
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>

      <div style={{ color: 'red' }}>{errorMessage}</div>

      <button onClick={handleSaveQuiz}>Save Quiz</button>
      <button onClick={handleCancelQuiz}>Cancel</button>
    </div>
  );
};

export default QuizForm;
