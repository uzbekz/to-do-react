import {useNavigate,Link} from 'react-router-dom'
import {useState} from 'react'
function Login(){
  const navigate = useNavigate()
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <>
      <form onSubmit={handleSubmit}>
        <input required type='email' placeholder='email..' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input required type='password' placeholder='password..' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>login</button>
      </form>
      <Link to='/register'>Don't have an account - register</Link>
    </>
  )
}

export default Login