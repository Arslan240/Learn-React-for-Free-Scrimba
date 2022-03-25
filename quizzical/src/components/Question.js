import React from "react";
import './css/Question.css'
import { nanoid } from 'nanoid'

export default function Question(props) {

  const createOptionsEl = () => {
    const options = props.questionObj.options

    if(props.questionObj.checkAnswers){
      console.log('checkAnswers true in Question')
      const optionsSpans = options.map(curr_option => {
        let classes = 'option unclickable '

        if(props.questionObj.selected === curr_option){
          classes += curr_option === props.questionObj.correct_answer 
                    ? 'correct-option '
                    : 'wrong-option '
        }
        else {
          classes += curr_option === props.questionObj.correct_answer
                    ? 'correct-option '
                    : 'lighter-color '
        }

        return (
          <span
            className={classes}
          >
            {curr_option}
          </span>
        )
      })
      return optionsSpans
    }
    else {
      const optionsSpans = options.map(option => {
        return <span className={`option ${props.questionObj.selected === option 
                ? 'selected-option' 
                : 'unselected-option'}`}
                key={nanoid()}
                onClick={(event) => props.handleClick(event, props.questionObj.id)}
              >
                {option}
              </span>
      })
      console.log(optionsSpans, 'in Question')
      return optionsSpans
    }
  }

  const optionsEl = createOptionsEl();

  createOptionsEl()
  // console.log(props.questionObj.question,'in Question')
  return (
    <React.Fragment key={nanoid()}>
      <div className="single-question" >
          <h2>{props.questionObj.question}</h2>
          <div className="options">
            {optionsEl}
            {/* <span className="option unselected-option">Adios</span>
            <span className="option unselected-option">Hola</span>
            <span className="option unselected-option">Au Revoir</span>
            <span className="option unselected-option">Salir</span> */}
          </div>
          <hr/>
      </div>
    </React.Fragment>
  );

}