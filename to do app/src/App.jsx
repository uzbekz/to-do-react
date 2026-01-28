import Input from './Input.jsx'
import './App.css'
import {  useState } from 'react'
import History from './History.jsx'
import Completed from './Completed.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
function App() {
  const [task, setTask] = useState([])
  const [doneTask, setDoneTask] = useState([])
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/mainPage' element={<MainPage />}/>
    </Routes>
  )
}

export default App
