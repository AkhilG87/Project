const express = require('express')
const { verifyUser } = require('../helpers/verifyUser')
const { Blog } = require('../models/blog')
const { User } = require('../models/User')
const router = express.Router()

// all blogs
router.get('/', async (req, res) => {
  const allBlogs = await Blog.find().sort('-createdAt').populate('user')
  res.send(allBlogs)
})

// show a particular blog
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id)
    if (blog) {
      res.json({
        found: blog,
      })
    } else
      res.json({
        message: 'blog does not exist',
      })
  } catch (error) {
    res.json(error.message)
  }
})

router.use('/', verifyUser, (req, res, next) => {
  next()
})

// create a new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = await new Blog({
      title: req.body.title,
      desc: req.body.desc,
      user: req.cookies.userId,
    })
    const user = await User.findById(req.cookies.userId)
    await newBlog.save()
    await user.blog.push(newBlog.id)
    await user.save()
    res.json({
      blog: newBlog,
      user: user,
    })
  } catch (error) {
    console.log(error.message)
  }
})

// form to make a new blog
router.get('/new', (req, res) => {
  res.send('form to make a new blog')
})

// update a particular blog
router.put('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json({
      message: 'updated succefully',
    })
  } catch (error) {
    res.json(error.message)
  }
})

// delete a particular blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({
      message: 'deleted succefully',
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router
