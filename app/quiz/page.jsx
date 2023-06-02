'use client'
import React, { useState } from 'react';
import { quiz } from '../data.js';
import Navbar from '../components/Navbar/Navbar.jsx';

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[currentQuestion];

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    const isCorrect = answer === correctAnswer;
    setResult((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 5 : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
    }));
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className='container'>
        <Navbar/>
      <h1>Test Sayfası</h1>
      <div>
        <h2>
         Sorular: {currentQuestion + 1} <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <h3>{question}</h3>
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
            {selectedAnswerIndex !== null ? (
              <button onClick={nextQuestion} className='btn'>
                {currentQuestion === questions.length - 1 ? 'Bitir' : 'Next'}
              </button>
            ) : (
              <button disabled className='btn-disabled'>
                {currentQuestion === questions.length - 1 ? 'Bitir' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Sonuç</h3>
            {result.correctAnswers === questions.length ? (
              <h3>Tebrikler! Twitter'ın hakkını veriyosun.🤙</h3>
            ) : (
              <h3>Twitter'da biraz daha zaman geçirmelisin. 😀</h3>
            )}
            {/* <p>Total questions: <span>{questions.length}</span></p>
            <p>Total score: <span>{result.score}</span></p> */}
            <p>Doğru sayısı: <span>{result.correctAnswers}</span></p>
            <p>Yanlış sayısı: <span>{result.wrongAnswers}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
