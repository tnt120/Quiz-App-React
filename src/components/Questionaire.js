import React from "react";

const Questionaire = ({
  handleAnswer,
  showAnswers,
  handleNextQuestion,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div>
      <div className="bg-white text-black p-10 rounded-lg shadow-md">
        <h2
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: question }}
        ></h2>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {answers.map((answer, index) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? "text-green-500"
              : "text-red-500"
            : "text-black";

          return (
            <button
              key={index}
              className={`${textColor} bg-white p-4 font-semibold rounded`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></button>
          );
        })}
      </div>
      {showAnswers && (
        <button
          onClick={handleNextQuestion}
          className="w-full mt-2 bg-purple-700 text-white p-4 font-semibold rounded shadow"
        >
          Next question
        </button>
      )}
    </div>
  );
};

export default Questionaire;
