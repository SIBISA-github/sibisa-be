const Database = require('../database/database')

class UserServices {
  static async getAllUsers () {
    await Database.createConnection()
    const query = 'SELECT * FROM users'
    const users = await Database.query(query)
    await Database.close()
    return users[0]
  };

  static async insertUserToDatabase (name, username, email, password) {
    await Database.createConnection()
    const query = {
      sql: 'INSERT INTO users (name, username, email, password, image, exp, idlevel, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [name, username, email, password, null, 0, 1, new Date(), new Date()]
    }

    const user = await Database.query(query)
    await Database.close()
    return user
  }

  static async getUserFromUsername (username) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM users WHERE username = ? ',
      values: [username]
    }
    const user = await Database.query(query)
    await Database.close()
    return user[0][0]
  }
}

module.exports = UserServices
