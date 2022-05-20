const express = require('express')
const cors = require('cors')

// Load Environment Variables
require('dotenv').config()

const app = express()
app.use(cors())
const { userRouters } = require('./src/routers')

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/swagger/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//  for body parser
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/user', userRouters)

app.listen(process.env.PORT || 5000, () => console.log('connection success'))
