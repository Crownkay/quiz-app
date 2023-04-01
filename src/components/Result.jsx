import React from "react";

const Result = ({ userAnswers, questions }) => {
  const correctAnswers = questions.filter((question, index) => question.correct_answer === userAnswers[index]).length;
  const score = ((correctAnswers / questions.length) * 100).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Your score: {score}%</h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className={`font-medium ${question.correct_answer === userAnswers[index] ? "text-green-500" : "text-red-500"}`}>Question {index + 1}: {question.question}</p>
            <p>Your answer: {userAnswers[index] || "No answer provided"}</p>
            <p>Correct answer: {question.correct_answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
