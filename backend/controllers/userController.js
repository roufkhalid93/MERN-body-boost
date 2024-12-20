const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
    
        //create token
        // const token = createToken(user._id)
        const token = createToken({ _id: user._id, isAdmin: user.isAdmin });
    
        res.status(200).json({
          email: user.email,
          token,
          isAdmin: user.isAdmin
      })
      } catch (error) {
        res.status(400).json({error: error.message})
      }

}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, isAdmin} = req.body

  try {
    const user = await User.signup(email, password, isAdmin)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, isAdmin: user.isAdmin, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }