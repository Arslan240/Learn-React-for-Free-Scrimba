import React from 'react'
import './App.css';
import StartPage from './components/StartPage';
import Main from './components/Main';
import { nanoid } from 'nanoid'

export default function App() {
  const [quizState, setQuizState] = React.useState( { quizGoing:false } )
  const [questionState, setQuestionState] = React.useState(null)
  const [score, setScore] = React.useState(0)
  const [fetchState, setFetchState] = React.useState(false)
  
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9')
      .then(res => res.json())
      .then(data => {
        setQuestionState(createStateFromData(data.results))

        
        console.log(data.results, 'in fetch')
      })
      .catch(error => console.log(error))
      
      // questionState && console.log(questionState,'in fetch')
      // console.log('in fetch')
  },[fetchState])

  // This function creates our desired object from the fetched data, it omits what we don't need and keep/add the data we need.
  function createStateFromData(results) {
    const newResults = results.map(result => {
      return {
        question: result.question,
        options: [...result.incorrect_answers,  result.correct_answer],
        correct_answer: result.correct_answer,
        selected: null,
        checkAnswers: false,
        id:nanoid()
      }
    })
    // console.log(newResults,'in storedata')
    return newResults
  }

  /* ===============================
      QUESTION COMPONENT FUNCTIONS  
    =============================== */
  function handleSelection(event, id){
    // we only need to change the selected option in the specific question obj where id matches with the id passed to event listener.
    console.log(event.target.textContent , 'in handleSelection')
    setQuestionState(prevState => {
      return prevState.map(prevStateObj => {
        return prevStateObj.id === id 
          ? {...prevStateObj, selected: event.target.textContent} 
          : prevStateObj
      })
    })
  }

  function checkAnswers() {
    setQuestionState(prevState => {
      return prevState.map(prevStateObj => {
        return {...prevStateObj, checkAnswers: true}
      })
    })

    let dummy_score = 0
    questionState.forEach(questionObj => {
      questionObj.selected === questionObj.correct_answer && dummy_score++
      console.log(score)
    })
    // we set score state so that we can show it in Main page.
    setScore(dummy_score)
  }

  function playAgain (event) {
    // setQuizState(false)
    setQuestionState(null)
    setScore(0)
    setFetchState(prevState => !prevState)

  }

  // console.log(questionState, 'in App')
  questionState && console.log(questionState, 'in App')

  function startQuiz(){
    setQuizState(prevState => ({...quizState, quizGoing: !prevState.quizGoing}))
    console.log('start quiz clicked')
  }

  return (
    <div className="App">
      {quizState.quizGoing 
        ? questionState && 
          <Main 
            questionObj={questionState} 
            handleClick={handleSelection} 
            checkAnswers={checkAnswers}
            playAgain={playAgain}
            score={score}
          /> 
        : <StartPage start={startQuiz}/>}
    </div>
  );
}


