import React from "react";

function QuestionItem({ question, deleteQsn, changeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChangeAnswer(event){
    changeAnswer(id, parseInt(event.target.value))
  }

  function handleDeleteWhenClicked(){
    deleteQsn(id)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteWhenClicked}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
