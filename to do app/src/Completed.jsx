import './Completed.css'

function Completed({doneTask, setDoneTask}){
  async function clearTasks(){
    if(doneTask.length === 0) return 
    const res = await fetch('http://localhost:5000/tasks/completed',{
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
    setDoneTask([])
    alert(data.message)
  }
  return(
    <div className="completed-tasks-container">
      <button onClick={clearTasks}>clear History</button>
      {
        doneTask.map((task) => {
          return (
            <div key={task.id} className='completed-task-details'>
              <span>task : {task.task}</span>
              <span>Completed before: {task.date}</span>
            </div>
          )
        })
      }
    </div>
  )
}
export default Completed