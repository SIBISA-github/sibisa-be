const express = require('express')
const userController = require('../controllers/userController')

const routers = express.Router()

routers.get('/', userController.getAllUsers)

module.exports = routers
