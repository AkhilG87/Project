const express = require('express')
const { User } = require('../models/User')
const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.json('fill all field')
      return
    }
    const isAlreadyUser = await User.findOne({ email: email })
    if (isAlreadyUser) {
      res.json('user already exist')
      return
    }
    const newUser = await new User(req.body)
    await newUser.save()
    res.json('created success')
  } catch (error) {
    console.log(error.message)
  }
})
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body
    if (!email || !req.body.password) {
      return res.status(400).json('fill all field')
    }
    const user = await User.findOne({ email: email })
    if (!user || req.body.password !== user.password) {
      return res.status(400).json('fields invalid')
    }
    const { password, ...other } = user._doc
    res
      .cookie('userId', user.id, {
        httpOnly: true,
      })
      .status(200)
      .json(other)
  } catch (error) {
    console.log(error.message)
  }
})
router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('userId')
    res.json('logout sucess')
  } catch (er) {
    console.log(er.message)
  }
})
module.exports = router
