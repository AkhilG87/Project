const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config()
require('./helpers/mongoose')
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', true)
  next()
})
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)

app.use('/auth', require('./routes/user.js'))
app.use('/blogs', require('./routes/index.js'))

app.listen(port || 4000, () => {
  console.log('server is running :', port)
})
