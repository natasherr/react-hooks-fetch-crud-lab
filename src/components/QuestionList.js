import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
     .then((res)=> res.json())
     .then((questions)=> setQuestions(questions))
  }, [])

  function handleDeleteWhenClicked(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
     .then((res)=> res.json())
     .then(()=> {
      const updatedQuestions = questions.filter((question)=> (
          question.id !== id
      ))
      setQuestions(updatedQuestions)
     })
  }

  function changeAnswer(id, correctIndex){
    const configObject= {
      method: "PATCH",
      headers:{"Content-Type": "application/json",},
      body:JSON.stringify({correctIndex}),
    }

    fetch(`http://localhost:4000/questions/${id}`, configObject)
     .then((res)=> res.json())
     .then((updatedQsn)=> {
      const updatedQuestions = questions.map((question)=> {
        if(question.id===updatedQsn.id){return updatedQsn}
        else{return question}
      })
      setQuestions(updatedQuestions)
     })
  }

  const items= questions.map((x, index) => (
    <QuestionItem key={index} question={x} 
    deleteQsn={handleDeleteWhenClicked} 
    changeAnswer={changeAnswer} />
  ))


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{items}</ul>
    </section>
  );
}

export default QuestionList;
