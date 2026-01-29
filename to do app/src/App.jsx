import Input from './Input.jsx'
import './App.css'
import History from './History.jsx'
import Completed from './Completed.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import MainPage from './MainPage.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/mainPage' element={<MainPage />}/>
    </Routes>
  )
}

export default App
