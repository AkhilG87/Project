import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Post.scss'
const Post = (props) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(`/blogs/${props.path}`)
  }
  const newDate = new Date(props.date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <div className="post" onClick={clickHandler}>
      <div className="left">
        <span>0{props.id}</span>
      </div>
      <div className="right">
        <div className="userInfo">
          <img
            src="https://img.freepik.com/free-vector/creative-writing-concept-illustration_114360-8167.jpg?w=1060&t=st=1675944849~exp=1675945449~hmac=41576f077f80b1673adde017af9b1d69a2ee1becd96fb249332efc710b6a9f7f"
            alt=""
          />
          <span>{props.name}</span>
        </div>
        <div className="title">{props.title}</div>
        <div className="date">
          <span>{newDate.toLocaleDateString(undefined, options)}</span>
        </div>
      </div>
    </div>
  )
}

export default Post
