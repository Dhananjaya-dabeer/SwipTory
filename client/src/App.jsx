import { useState } from 'react'
import './App.css'
import HomePage from './components/Desktop/HomePage.module'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signin from './components/Desktop/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element = {<HomePage/>}/>
        <Route path='/signin' element = {<Signin/>}/>      
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
