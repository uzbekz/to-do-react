import { useState,useEffect } from "react"
import {useNavigate, Link} from  'react-router-dom'
import './Login.css'
function Register(){
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=> {
      document.body.classList.add('login-bg');
      return () => {
        document.body.classList.remove('login-bg');
      }
    },[])
  

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
    <div className = "login-container">
      <form onSubmit={handleSubmit} className='login-form'>
        <label for="email">Email</label>
        <input type="text" id="email" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        <label for="password">Password</label>
        <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">register</button>
      </form>
      <Link to = '/'>already have an account</Link>
    </div>
  )
}
export default Register