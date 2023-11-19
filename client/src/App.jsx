import { useState } from 'react'
import './App.css'
import HomePage from './components/Desktop/HomePage.module'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HomePage/>
    </div>
  )
}

export default App
