const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2023/01/24/01/42/ai-generated-7740032__480.jpg',
    },
    blog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  { timeStamps: true },
)

// userSchema.pre('save', async function () {
//   try {
//     const hash = await bcrypt.hash(this.password, 10)
//     this.password = hash
//   } catch (error) {
//     console.log(error.message)
//   }
// })

// userSchema.methods.isPasswordValidate = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password)
//   } catch (error) {
//     console.log(error.message)
//   }
// }

module.exports.User = mongoose.model('User', userSchema)
