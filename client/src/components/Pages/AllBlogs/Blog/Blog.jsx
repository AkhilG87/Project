import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Blog.scss'
const Blog = ({ date, name, title, desc, path }) => {
  const navigate = useNavigate()
  return (
    <div
      className="blog"
      onClick={() => {
        navigate(`/blogs/${path}`)
      }}
    >
      <div className="left">
        <div className="userInfo">
          <img
            src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"
            alt=""
          />
          <span id="name">{name}</span>
          <span id="date">{date}</span>
        </div>
        <div className="heading">
          <span>{title}</span>
        </div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: desc }}></div>
        {/* <div className="desc">
          <span>{desc}</span>
        </div> */}
      </div>
      <div className="right1">
        <img
          src="https://images.unsplash.com/photo-1675790462636-213d2e69dce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
      </div>
    </div>
  )
}

export default Blog
