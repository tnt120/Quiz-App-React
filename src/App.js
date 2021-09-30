import React, { useState, useEffect } from "react";

import Questionare from "./components/Questionaire";
import Form from "./components/Form";

const API_URL = "https://opentdb.com/api.php?";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [category, setCategory] = useState(21);
  const [difficulty, setDifficulty] = useState("easy");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    getAPI(API_URL);
  }, []);

  const getAPI = (API) => {
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
        }));

        setQuestions(questions);
      });
  };

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    getAPI(
      `${API_URL}amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    setCategory(21);
    setDifficulty("easy");
    setShowForm(false);
  };

  const handlePlayAgain = (e) => {
    e.preventDefault();

    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setShowAnswers(false);
    setShowForm(true);
  };

  return showForm ? (
    <Form
      handleOnSubmit={handleOnSubmit}
      handleCategoryChange={handleCategoryChange}
      handleDifficultyChange={handleDifficultyChange}
    />
  ) : questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (
        <>
          <h1 className="text-white text-3xl font-bold">{`Your score is ${score}`}</h1>
          <input
            type="submit"
            className={
              "w-full mt-6 bg-purple-700 text-white p-4 font-semibold rounded shadow cursor-pointer"
            }
            value="Play again"
            onClick={handlePlayAgain}
          />
        </>
      ) : (
        <Questionare
          data={questions[currentIndex]}
          showAnswers={showAnswers}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  ) : (
    <h1 className="text-3xl text-white">Loading...</h1>
  );
}

export default App;
