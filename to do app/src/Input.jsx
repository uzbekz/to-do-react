import { useState } from "react"
import dayjs from 'dayjs'

function Input({task,setTask}){
  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState(dayjs().format('YYYY-MM-DD'))
  async function addTask(){
    if (!inputValue.trim()) return
    const newTask = {
      task : inputValue,
      date : dateValue
    }
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify(newTask)
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return;
    }

    setTask([data, ...task])
    setInputValue('')
    setDateValue(dayjs().format('YYYY-MM-DD'))
  }
  return (
    <div>
      <input type="text" 
        placeholder="Enter a task" 
        value={inputValue} 
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        required
      >
      </input>
      <input type="date"
        value={dateValue}
        onChange={(event) => {
          setDateValue(event.target.value)
        }}
      >
      </input>
      <button onClick={addTask}>Add Task</button>
    </div>
  )
}
export default Input