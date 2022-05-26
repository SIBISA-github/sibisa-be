const UserServices = require('../services/userServices')
const HashPassword = require('../utils/hash/hashPassword')
const Tokenization = require('../utils/jwtToken/tokenization')
const Response = require('../utils/response/response')
const PayloadValidator = require('../utils/validator')
const UploadFiles = require('../cloud-storage/uploadFile')

class UserController {
  static async getAllUsers (req, res) {
    try {
      const users = await UserServices.getAllUsers()

      if (!users) throw new Error('Error while get all users')

      const response = Response.successResponse(200, 'Get All Users', users)

      return res.status(200).send(response)
    } catch (err) {
      // Beautify error message to remove double quote from joi validation
      const message = err.message.replace(/['"]+/g, '')
      const response = Response.badResponse(message, 400)

      return res.status(400).send(response)
    }
  }

  static async updateDataUsers (req, res) {
    const id = req.params.id
    const payload = req.body
    let newFileName
    const image = req.file
    try {
      let user = await UserServices.getUserById(id)

      if (!user) throw new Error('User not found')

      if (image) {
        newFileName = new Date().getTime() + '-' + image.originalname
        UploadFiles.uploadToGoogleCloudStorage(image, newFileName)
        newFileName = process.env.PATH_STORAGE + newFileName
      } else {
        newFileName = user.image
      }

      if (!payload.name) payload.name = user.name
      if (!payload.username) payload.username = user.username

      const updateUser = await UserServices.updateUser(id, payload.name, payload.username, newFileName)

      if (!updateUser) throw new Error('Error while update user')

      user = await UserServices.getUserById(id)

      const response = Response.successResponse(200, 'Update User Success', user)
      return res.status(200).send(response)
    } catch (err) {
      // Beautify error message to remove double quote from joi validation
      const message = err.message.replace(/['"]+/g, '')
      const response = Response.badResponse(message, 400)

      return res.status(400).send(response)
    }
  }

  static async register (req, res) {
    const payload = req.body

    try {
      // Validate payload
      PayloadValidator.validateUserRegister(payload)

      // check username is exist
      const user = await UserServices.getUserFromUsername(payload.username)
      if (user) throw new Error('Username already exist')
      // hash password
      const hash = await HashPassword.hashPassword(payload.password)

      // Insert To DB
      const insertUser = await UserServices.insertUserToDatabase(payload.name, payload.username, payload.email, hash)

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
      // Validate payload
      PayloadValidator.validateUserLogin(payload)

      // Get User From Database
      // console.log(payload)
      const user = await UserServices.getUserFromUsername(payload.username)
      // console.log(user)
      if (!user) throw new Error('User not found')

      // Compare password
      const comparePassword = await HashPassword.checkPassword(payload.password, user.password)
      if (!comparePassword) throw new Error('Password not match')

      const userData = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }

      // Create Token
      const token = await Tokenization.makeToken(userData)

      // Create Base Response
      const response = Response.successResponse(200, 'Login Success', { token })

      return res.status(200).send(response)
    } catch (err) {
      // Beautify error message to remove double quote from joi validation
      const message = err.message.replace(/['"]+/g, '')
      const response = Response.badResponse(message, 400)

      return res.status(400).send(response)
    }
  }
}

module.exports = UserController
