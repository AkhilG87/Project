const { User } = require('../models/User')
const createHttpError = require('http-errors')

module.exports.verifyUser = async (req, res, next) => {
  try {
    const user_id = req.cookies.userId
    const user = await User.findById(user_id)
    if (!user){
        throw createHttpError.BadRequest('You are not allowed on this route')
    }
    next()
  } catch (err) {
    console.log(err.message)
  }
}
