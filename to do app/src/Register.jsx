import { useState } from "react"
import {useNavigate, Link} from  'react-router-dom'

function Register(){
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e){
    e.preventDefault()

    const res = await fetch('http://localhost:5000/register', {
      method : 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : userName,
        password : password
      })
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return
    }

    alert("Registration successful!")
    navigate('/')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        <input type="text" placeholder="username" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">register</button>
      </form>
      <Link to = '/'>already have an account</Link>
    </>
  )
}
export default Register