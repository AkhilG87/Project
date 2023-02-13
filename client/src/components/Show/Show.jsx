import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './Show.scss'

const Show = () => {
  const navigate = useNavigate()
  const deleteHandler = async () => {
    await axios.delete('http://localhost:4000/blogs/' + params, {
      withCredentials: true,
    })
    navigate('/blogs')
  }
  const { currentUser } = useContext(AuthContext)
  const params = useLocation().pathname.split('/')[2]
  const { isLoading, error, data } = useQuery(['particularBlog'], () =>
    axios.get('http://localhost:4000/blogs/' + params).then((res) => {
      return res.data
    }),
  )
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div id="show">
      <h1>{data.found.title}</h1>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: data.found.desc }}></div>
      </div>
      {currentUser._id === data.found.user ? (
        <div className="button">
          <button
            className="up"
            onClick={() => {
              navigate('/blogs/' + params + '/edit')
            }}
          >
            Update
          </button>
          <button className="de" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default Show
