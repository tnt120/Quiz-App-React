import React from "react";

const Form = ({
  handleOnSubmit,
  handleCategoryChange,
  handleDifficultyChange,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="category-select">Category:</label>
      <select
        name="category"
        className="w-full mb-2 bg-purple-600 text-white p-4 font-semibold rounded shadow cursor-pointer	"
        id="category"
        onChange={handleCategoryChange}
      >
        <option value="21">Sports</option>
        <option value="11">Films</option>
        <option value="12">Music</option>
        <option value="25">Art</option>
        <option value="27">Animals</option>
      </select>
      <label htmlFor="difficulty-select">Difficulty:</label>
      <select
        name="difficulty"
        className="w-full mb-2 bg-purple-600 text-white p-4 font-semibold rounded shadow cursor-pointer	"
        id="difficulty"
        onChange={handleDifficultyChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="submit"
        className="w-full mt-6 bg-purple-700 text-white p-4 font-semibold rounded shadow cursor-pointer	"
        value="Start game"
      />
    </form>
  );
};

export default Form;
