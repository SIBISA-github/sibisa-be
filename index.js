const express = require('express')
const cors = require('cors')

// Load Environment Variables
require('dotenv').config()

const app = express()
app.use(cors())
const { questionRouters } = require('./src/routers')
const { userRouters } = require('./src/routers')
const { lessonRouters } = require('./src/routers')

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/swagger/swagger.json')
// const { getBuckets } = require('./src/cloud-storage/storage')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// getBuckets()
//  for body parser
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/questions', questionRouters)
app.use('/api/v1/user', userRouters)
app.use('/api/v1/lessons', lessonRouters)

app.listen(process.env.PORT || 5000, () => console.log('connection success'))
