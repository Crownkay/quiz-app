import React, { useEffect, useState } from "react";
import { getQuizData } from "../utils/api";
import LogoutButton from "./LogoutButton";
import Question from "./Question";
import Result from "./Result";

const Quiz = ({ displayName }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Submit button function
  const handleAnswer = (answer) => {
    const updateAnswers = [...userAnswers];
    updateAnswers[currentQuestion] = answer;
    setUserAnswers(updateAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleStart = async () => {
    setQuizStarted(true);
    const data = await getQuizData("9", "medium", 30);
    setQuestions(data);
    setTime(15 * 60); // 15 minutes in seconds
  };

  useEffect(() => {
    // set up interval to count down time
    let intervalId;
    if (quizStarted) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setShowResult(true);
            clearInterval(intervalId);
            return prevTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
    // clean up interval when component unmount
    return () => clearInterval(intervalId);
  }, [quizStarted]);

  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toString().padStart(2, "0");

  // Render quiz qustions

  if (showResult) {
    return <Result questions={questions} userAnswers={userAnswers} />;
  }

  if (!quizStarted) {
    return (
      <div className="max-w-xl mx-auto py-6 px-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded"
          onClick={handleStart}
        >
          Start Quiz
        </button>
      </div>
    );
  }
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base md:text-2xl font-bold">
          Welcome{" "}
          <span className="text-sm">{displayName ? displayName : "User"}</span>
        </h1>
        {quizStarted && (
          <div>
            {minutes} : {seconds}
          </div>
        )}
        <LogoutButton />
      </div>
      <Question
        key={questions[currentQuestion].question}
        questions={questions[currentQuestion]}
        userAnswers={userAnswers}
        handleAnswer={handleAnswer}
        
      />

    </div>
  );
};

export default Quiz;
