import React from 'react'
import './css/StartPage.css'

export default function StartPage(props){

  console.log('Props:', props)
  return (
    <div className='start-div'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button className='btn-start-quiz' onClick={props.start}>Start Quiz Now</button>
    </div>
  );
}