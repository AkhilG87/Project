import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './login.scss'

const Login = () => {
  const navigate = useNavigate()

  const { login, getAllData } = useContext(AuthContext)
  const email = useRef('')
  const password = useRef('')
  const handleClick = async (e) => {
    e.preventDefault()
    await getAllData()
    await login({
      email: email.current.value,
      password: password.current.value,
    })
    navigate('/blogs')
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
            incidunt explicabo officiis placeat dicta molestiae dignissimos ipsa
            iure, expedita facere nisi excepturi itaque praesentium tempora
            recusandae possimus neque totam perferendis!
          </p>
          <span>Dont you have an account</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" ref={email} placeholder="Username" required />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              required
            />
            <button type="submit" onClick={handleClick}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
