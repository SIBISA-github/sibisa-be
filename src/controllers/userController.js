const db = require('../database/database')

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
}

module.exports = UserController
