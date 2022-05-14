const express = require('express')

// Load Environment Variables
require('dotenv').config()

const app = express()
const { userRouters } = require('./src/routers')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouters)

app.listen(process.env.PORT || 5000, () => console.log('connection success'))
