const express = require('express')
const userController = require('../controllers/userController')

const routers = express.Router()
routers.get('/', userController.getAllUsers)
routers.post('/register', userController.register)
routers.post('/login', userController.login)
routers.put('/level', userController.updateLevel)
routers.put('/exp', userController.updateExp)
module.exports = routers
