const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(cors())
const { questionRouters } = require('./src/routers')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/swagger/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/question', questionRouters)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})