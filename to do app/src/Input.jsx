import { useState } from "react"
import dayjs from 'dayjs'
function Input({task,setTask}){
  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState(dayjs().format('YYYY-MM-DD'))
  function addTask(){
    let taskObject = {
      id : crypto.randomUUID(),
      task : inputValue,
      date : dateValue
    }
    setTask([taskObject, ...task])
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
      }}>
      </input>
      <input type="date"
      value={dateValue}
      onChange={(event) => {
        setDateValue(event.target.value)
      }}>
      </input>
      <button onClick={addTask}>Add Task</button>
    </div>
  )
}
export default Input