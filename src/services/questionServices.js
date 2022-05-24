const Database = require('../database/database')

class questionServices {
  static async getAllQuestions () {
    await Database.createConnection()
    const query = 'SELECT * FROM questions'
    const questions = await Database.query(query)
    await Database.close()
    return questions[0]
  }

  static async getQuestionById (id) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM questions WHERE id = ?',
      values: [id]
    }
    const question = await Database.query(query)
    await Database.close()
    return question[0]
  }

  static async getQuestionByLevel (level) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM questions WHERE idlevel = ?',
      values: [level]
    }
    const question = await Database.query(query)
    await Database.close()
    return question[0]
  }
}

module.exports = questionServices
