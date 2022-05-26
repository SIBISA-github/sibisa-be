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
    const image = process.env.PATH_STORAGE + 'default.jpg'
    const query = {
      sql: 'INSERT INTO users (name, username, email, password, image, exp, idlevel, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [name, username, email, password, image, 0, 1, new Date(), new Date()]
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

  static async getUserById (id) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM users WHERE id = ? ',
      values: [id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user[0][0]
  }

  static async updateUser (id, name, username, image) {
    await Database.createConnection()
    const query = {
      sql: 'UPDATE users SET name = ?, username = ?, image = ? WHERE id = ?',
      values: [name, username, image, id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user
  }
}

module.exports = UserServices
