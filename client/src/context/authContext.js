import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  )
  const getAllData = async () => {
    const res = await axios.get('http://localhost:4000/blogs')
    setData(res.data)
  }
  const login = async (inputs) => {
    const res = await axios.post('http://localhost:4000/auth/login', inputs, {
      withCredentials: true,
    })
    setCurrentUser(res.data)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ setCurrentUser,currentUser, login, data, getAllData }}>
      {children}
    </AuthContext.Provider>
  )
}
