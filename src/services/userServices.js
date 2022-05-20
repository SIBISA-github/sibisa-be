const Database = require('../database/database')

class UserServices {
  static async getAllUsers () {
    await Database.createConnection()
    const query = 'SELECT * FROM users'
    const users = await Database.query(query)
    await Database.close()
    return users[0]
  };

  static async insertUserToDatabase (username, email, password) {
    await Database.createConnection()
    const query = {
      sql: 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      values: [username, email, password]
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
    console.log(user[0][0])
    await Database.close()
    return user[0][0]
  }
}

module.exports = UserServices
