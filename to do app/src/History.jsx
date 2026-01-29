import { useState } from "react"
function History({task,setTask, doneTask,setDoneTask}){
  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  
  async function deleteTask(Id){
    //delete the task in the backend
    const res = await fetch(`http://localhost:5000/tasks/${Id}`,{
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return
    }
    
    const newTasks = task.filter(item => item.id !== Id)

    setTask(newTasks)
    alert('successfully deleted the task')
  }

  async function updateTask(Id){
    const res = await fetch(`http://localhost:5000/tasks/${Id}`,{
      method : 'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify({
        task : inputValue,
        date : dateValue
      })
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return
    }

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

  async function removeTask(Id) {
    const res = await fetch(`http://localhost:5000/tasks/${Id}/completed`,{
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify({
        completed : true
      })
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return
    }

    const completedTask = task.find(item => item.id === Id)
    const remainingTasks = task.filter(item => item.id !== Id)

    setTask(remainingTasks)
    setDoneTask([completedTask, ...doneTask])
  }

  return (
    <div>
      {task.length !== 0 && task.map((item) => {
        return (
          <div key = {item.id}>
            {editingId === item.id ? 
            <div >
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
            <div >
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
          </div>
          )
        } 
      )} 
    </div>
  )
}
export default History