
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useState,useEffect } from 'react'

function App(){
  const[score,setScore]=useState(0)
  
  useEffect(()=>{
    console.log("Value changed");
  },[score])

  
  function IncreaseValue(){
    setScore(score+1)
  }
  function DecreaseValue(){
    setScore(score-1)
  }
  return (
   <>
    <h1>Game</h1>
    <p>Score{score}</p>
    <button onClick={IncreaseValue}>Score++</button>
    <button onClick={DecreaseValue}>Score--</button>
   </>
  )
}

export default App
