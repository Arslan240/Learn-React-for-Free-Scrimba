import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  const [count, setCount] = React.useState(0)
  const [testState, setTestState] = React.useState('start');
  const add = () => {
    setCount(prevCount => prevCount+1)
  }
  
  console.log(count) 
  // this one is workiing not running on every change
  // React.useEffect(() => {
  //   fetch('https://randomuser.me/api/')
  //     .then(res => res.json())
  //     .then(data => console.log(data, 'in useEffect'))
  // },[])  

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => console.log(data, 'in useEffect'))
      setTestState('lala')
    },[])
  
  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={add}>+</button>
    </div>
  );
}

export default App;
