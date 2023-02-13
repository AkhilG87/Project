import React, { useContext, useState } from 'react'
import './Navbar.scss'
import image from '../../assets/logo.png'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  const [navbar, setNavbar] = useState(false)
  const { setCurrentUser, currentUser } = useContext(AuthContext)
  const clickHandler = async () => {
    await axios.post('http://localhost:4000/auth/logout', {
      withCredentials: true,
    })
    localStorage.setItem('user', 'null')
    setCurrentUser(null)
  }

  const changeBackground = () => {
    if (window.scrollY >= 400) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', changeBackground)
  return (
    <div className={navbar ? 'navbar active' : 'navbar'}>
      <div className="logo" onClick={() => navigate('/blogs')}>
        <img src={image} alt="" />
      </div>
      <div className="right">
        <span className="ss">Your Blogs</span>
        <span className="ss">Membership</span>
        <span
          className="ss"
          onClick={() => {
            navigate('/blogs/new')
          }}
        >
          Write
        </span>
        <span className="ss" onClick={clickHandler}>
          Logout
        </span>

        <div className="GetStarted">
          <img src={currentUser.pic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
