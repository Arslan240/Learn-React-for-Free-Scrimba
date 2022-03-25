import React from "react";
import './css/Main.css'
import Question from "./Question";
import {nanoid} from 'nanoid'

export default function Main(props) {
  

  console.log(props.questionObj.question, 'in main')
  function renderQuestions(){
    return props.questionObj.map(questionObj => (
      <Question 
        questionObj={questionObj} 
        handleClick={props.handleClick}
      />
    ))
  }
  return (
    <div className="all-questions">
      {/* <Question questionObj={props.questionObj} handleClick={props.handleClick}/> */}
      {renderQuestions()}

      <div className="btn-score">
      {props.score !== 0 && <h2>You scored {props.score} / {props.questionObj.length} correct answers</h2>}
      
      {props.questionObj[0].checkAnswers 
      ? <button className="btn" onClick={props.playAgain}>Play Again</button>
      : <button className="btn" onClick={props.checkAnswers}>Check Answer</button>
      }
      
      
      </div>
    </div>
  );
}