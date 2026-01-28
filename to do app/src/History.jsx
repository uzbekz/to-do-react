import { useState } from "react"
function History({task,setTask, doneTask,setDoneTask}){
  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  
  function deleteTask(Id){
    const updatedTasks = task.filter((item) => item.id !== Id)
    setTask(updatedTasks)
  }

  function updateTask(Id){
    const updatedTasks = task.map((item) =>
      item.id === Id
        ? { ...item, task: inputValue, date: dateValue }
        : item
    );
    setTask(updatedTasks);
    setInputValue('')
    setDateValue('')
    setEditingId(null)
  }

  function removeTask(Id) {
    const completedTask = task.find(item => item.id === Id)
    const remainingTasks = task.filter(item => item.id !== Id)

    setTask(remainingTasks)
    setDoneTask([completedTask, ...doneTask])
  }

  return (
    <>
      {task.length !== 0 && task.map((item) => {
        return (
          <>
            {editingId === item.id ? 
            <div key={item.id}>
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
              <button onClick={() => {updateTask(item.id)}}>Update</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div> : 
            <div key={item.id}>
              <span>{item.task}</span>
              <span>{item.date}</span>
              <button onClick={() => {deleteTask(item.id)}}>Delete</button>
              <button onClick={()=>{
                setInputValue(item.task)
                setDateValue(item.date)
                setEditingId(item.id)
              }}>Edit</button>
              <button onClick={() => removeTask(item.id)}>done</button>
            </div> 
            }
          </>
          )
        } 
      )} 
    </>
  )
}
export default History