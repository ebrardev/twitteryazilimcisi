'use client'
import React, { useState } from 'react';
import { quiz } from '../data.js';
import Navbar from '../components/Navbar/Navbar.jsx';

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[currentQuestion];

  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
   
    } else {
      setSelectedAnswer(false);
  
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container'>
        <Navbar/>
      <h1>Sorular</h1>
      {!showResult && (
    <div>
      <h2>
        Sorular: {currentQuestion + 1} <span>/{questions.length}</span>
      </h2>
    </div>
  )}
      
      <div>
        {!showResult ? (
          
          <div className='quiz-container'>
        
            <h3>{questions[currentQuestion].question}</h3>
            {answers.map((answer, index) => (
              <li
                key={index}
                onClick={() => onAnswerSelected(answer, index)}
                className={
                  selectedAnswerIndex === index ? 'li-selected' : 'li-hover'
                }
              >
                <span>{answer}</span>
              </li>
            ))}
             {checked ? (
              <button onClick={nextQuestion} className='btn'>
                {currentQuestion === question.length - 1 ? 'Bitir' : 'Sonraki'}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className='btn-disabled'>
                {' '}
                {currentQuestion === question.length - 1 ? 'Bitir' : 'Sonraki'}
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>

<h3>Sonuç <span>{result.score === questions.length * 5 ? "100%" : (result.score / (questions.length * 5) * 100).toFixed(2) + "%"}</span></h3>



            <p>Doğru sayısı: <span>{result.correctAnswers}</span></p>
            <p>Yanlış sayısı: <span>{result.wrongAnswers}</span></p> 
            {result.correctAnswers === questions.length ? (
              <h3>Tebrikler! Twitter'ın hakkını veriyosun.🤙</h3>
            ) : (
              <h3>Twitter'da biraz daha zaman geçirmelisin. 😀</h3>
            )}
             {/* <p>Total questions: <span>{questions.length}</span></p>
            <p>Total score: <span>{result.score}</span></p>  */}
           
            <button onClick={() => window.location.reload()}>Tekrar Dene</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
