const Database = require('../database/database')

class questionServices {
    static async getAllQuestions(req, res) {
        await Database.createConnection()
        const query = 'SELECT * FROM questions'
        const questions = await Database.query(query)
        await Database.close()
        return questions[0]
    }

    static async getQuestionById(req, res) {
        await Database.createConnection()
        const query = `SELECT * FROM questions WHERE id = "${req}"`
        const question = await Database.query(query)
        await Database.close()
        return question[0]
    }

    static async getQuestionByLevel(req, res) {
        await Database.createConnection()
        const query = `SELECT * FROM questions WHERE question_level = "${req}"`
        const question = await Database.query(query)
        await Database.close()
        return question[0]
    }
}

module.exports = questionServices