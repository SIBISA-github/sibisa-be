const express = require('express')
const userController = require('../controllers/userController')

const routers = express.Router()
console.log(1)
routers.get('/', userController.getAllUsers)

module.exports = routers
