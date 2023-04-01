import React from "react";

const Question = ({ questions, currentQuestion,userAnswers, handleAnswer }) => {
  const {
    category,
    difficulty,
    question: text,
    correct_answer,
    incorrect_answers,
  } = questions;

  const answers = Array.isArray(incorrect_answers) ? [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5) : [];
  console.log(answers)
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{text}</h2>
      <p className="text-sm mb-4">
        <span className="font-medium">Category:</span> {category} |{" "}
        <span className="font-medium">Difficulty:</span> {difficulty}
      </p>

      <div>
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={`py-2 px-4 rounded-lg mr-2 mb-2 ${
              currentQuestion !== null &&
              "disabled:bg-gray-400 disabled:cursor-not-allowed"
            } ${
              currentQuestion === null &&
              "bg-blue-600 text-white hover:bg-blue-700"
            } ${
              userAnswers[currentQuestion] === answer &&
              "bg-green-400 hover:bg-green-500"
            } ${
              userAnswers[currentQuestion] !== answer &&
              userAnswers[currentQuestion] !== null &&
              answer === correct_answer &&
              "bg-green-400 hover:bg-green-500"
            } ${
              userAnswers[currentQuestion] !== answer &&
              userAnswers[currentQuestion] !== null &&
              answer !== correct_answer &&
              "bg-red-400 hover:bg-red-500"
            }`}
            disabled={currentQuestion === null}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
