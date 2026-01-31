import {useState} from 'react'
import History from './History'
import Input from './Input'
import Completed from './Completed'
import Header from './Header'
import './MainPage.css'
import { useEffect } from 'react'
function MainPage(){
  const [task, setTask] = useState([])
  const [doneTask, setDoneTask] = useState([])
  useEffect(() => {
    async function fetchTasks(){
      const res = await fetch('http://localhost:5000/tasks',{
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Failed to fetch tasks')
        return
      }

      let completedTasks = data.filter(data => data.completed)
      let uncompletedTasks = data.filter(data => !data.completed)

      setTask(uncompletedTasks)
      setDoneTask(completedTasks)
    }
    fetchTasks()
  },[])
  return (
    <div className='app-container'>
      <div className="left-column">
        <Input task={task} setTask={setTask}/>
        <History setDoneTask={setDoneTask} doneTask={doneTask} task={task} setTask={setTask}/>
      </div>
      <div>
        <Completed doneTask={doneTask} setDoneTask={setDoneTask}/>
      </div>
      <Header/>
    </div>
  )
}
export default MainPage