import { useNavigate } from "react-router-dom"
function Header(){
  const navigate = useNavigate()
  function logout(){
    localStorage.clear()
    navigate('/')
  }
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  )
}
export default Header