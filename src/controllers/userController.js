const db = require('../database/database')
const UserServices = require('../services/userServices')
const HashPassword = require('../utils/hash/hashPassword')
const Tokenization = require('../utils/jwtToken/tokenization')
const Response = require('../utils/response/response')

class UserController {
  static async getAllUsers (req, res) {
    try {
      console.log('getAllUsers')
      await db.query('SELECT * FROM users', (err, result) => {
        if (err) res.status(500).send(err)
        res.status(200).json(result)
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }

  static async register (req, res) {
    console.log('register')
    const payload = req.body

    try {
      // hash password
      const hash = await HashPassword.hashPassword(payload.password)

      // Insert To DB
      const insertUser = await UserServices.insertUserToDatabase(payload.username, payload.email, hash)

      if (!insertUser) throw new Error('Error while register user')
      // Create Base Response
      const response = Response.successResponse(201, 'User Created', null)

      return res.status(201).send(response)
    } catch (err) {
      // Beautify error message to remove double quote from joi validation
      const message = err.message.replace(/['"]+/g, '')
      const response = Response.badResponse(message, 400)

      return res.status(400).send(response)
    }
  }

  static async login (req, res) {
    const payload = req.body
    try {
      // Get User From Database
      // console.log(payload)
      const user = await UserServices.getUserFromUsername(payload.username)
      // console.log(user)
      if (!user) throw new Error('User not found')

      // Compare password
      const comparePassword = await HashPassword.checkPassword(payload.password, user.password)
      if (!comparePassword) throw new Error('Password not match')

      // Create Token
      const token = await Tokenization.makeToken(user)

      // Create Base Response
      const response = Response.successResponse(200, 'Login Success', { token })

      return res.status(200).send(response)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}

module.exports = UserController
