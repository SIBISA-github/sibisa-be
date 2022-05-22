const questionServices = require('../services/questionServices')
const Response = require('../utils/response/response')

class questionController {
    static async getAllQuestions(req, res) {
        try {
            const questions = await questionServices.getAllQuestions()
            
            if (!questions) throw new Error('Error while getting questions')

            const response = Response.successResponse(200, 'Questions retrieved successfully', questions)
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = Response.badResponse(message, 400)

            return res.status(400).send(response)
        }
    }

    static async getQuestionById(req, res) {
        try {
            const question = await questionServices.getQuestionById(req.params.id)
            
            if (!question) throw new Error('Error while getting questions')

            const response = Response.successResponse(200, 'Questions retrieved successfully', question)
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = Response.badResponse(message, 400)

            return res.status(400).send(response)
        }
    }

    static async getQuestionByLevel(req, res) {
        try {
            const questions = await questionServices.getQuestionByLevel(req.params.level)
            
            if (!questions) throw new Error('Error while getting questions')

            const response = Response.successResponse(200, 'Questions retrieved successfully', questions)
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = Response.badResponse(message, 400)

            return res.status(400).send(response)
        }
    }
}

module.exports = questionController