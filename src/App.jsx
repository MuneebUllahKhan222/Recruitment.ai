import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './Components/Home'
import Interview from './Components/Interview'
import { Route, Routes } from 'react-router-dom'
import Results from './Components/Results'

function App() {

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/interview' element={<Interview />}/>
      <Route exact path='/result' element={<Results />}/>
    </Routes>

      
    </>
  )
}

export default App
