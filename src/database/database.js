const mysql = require('mysql')

console.log(process.env.DB_HOST)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true
})

db.connect((err) => {
  if (err) {
    return console.error(`error : ${err.message}`)
  }
  console.log('Connected to MySQL Server')
})

db.on('error', (err) => {
  console.log('[mysql error]', err)
})

module.exports = db
