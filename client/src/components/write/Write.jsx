import React, { useState, useRef, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import './write.scss'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Write = () => {
  const navigate = useNavigate()
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [cc, setCc] = useState(false)
  const [title, setTitle] = useState('')
  const params = useParams()
  const getBlog = async () => {
    if (params.id !== undefined) {
      const { data } = await axios.get(
        'http://localhost:4000/blogs/' + params.id,
        {
          withCredentials: true,
        },
      )
      if (data) {
        setCc(true)
        setTitle(data.found.title)
        setContent(data.found.desc)
      }
    }
  }
  useEffect(function () {
    getBlog()
  }, [])
  const clickHandler = async () => {
    if (cc) {
      await axios.put(
        'http://localhost:4000/blogs/' + params.id,
        {
          title: title,
          desc: content,
        },
        {
          withCredentials: true,
        },
      )
    } else {
      await axios.post(
        'http://localhost:4000/blogs',
        {
          title: title,
          desc: content,
        },
        {
          withCredentials: true,
        },
      )
    }
    navigate('/blogs')
  }
  return (
    <div className="write">
      <label htmlFor="">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <label htmlFor="">Description</label>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      <button className="publish" onClick={clickHandler}>
        {cc ? 'Update' : 'Publish'}
      </button>
    </div>
  )
}

export default Write
