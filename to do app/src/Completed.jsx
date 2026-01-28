function Completed({doneTask, setDoneTask}){
  function clearTasks(){
    setDoneTask([])
  }
  return(
    <>
      <button onClick={clearTasks}>clear History</button>
      {
        doneTask.map((task) => {
          return (
            <div key={task.id}>
              <span>task : {task.task}</span>
              <span>Completed before: {task.date}</span>
            </div>
          )
        })
      }
    </>
  )
}
export default Completed