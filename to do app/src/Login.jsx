import {useNavigate,Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './Login.css'
function Login(){
  const navigate = useNavigate()
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=> {
    document.body.classList.add('login-bg');
    return () => {
      document.body.classList.remove('login-bg');
    }
  },[])

  async function handleSubmit(e){
    e.preventDefault()

    const res = await fetch('http://localhost:5000/login',{
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if(!res.ok){
      alert(data.message)
      return
    }

    localStorage.setItem('token', data.token)
    alert('login success')
    navigate('/mainPage')
  }
  return (
    <div className = "login-container">
      <form onSubmit={handleSubmit} className='login-form'>
        <label for="email">Email</label>
        <input required id = "email" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label for="password">Password</label>
        <input required id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>login</button>
      </form>
      <Link to='/register'>Don't have an account - register</Link>
    </div>
  )
}

export default Login