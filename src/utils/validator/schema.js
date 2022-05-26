const Joi = require('joi')

const UserRegisterSchema = Joi.object({
  name: Joi.string()
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
})

const UserLoginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
})

const QuestionIDSchema = Joi.number()
  .integer()
  .min(1)
  .required()

const LevelIDSchema = Joi.number()
  .integer()
  .min(1)
  .max(3)
  .required()

const LessonIDSchema = Joi.number()
  .integer()
  .min(1)
  .required()

const LevelUserSchema = Joi.object({
  idLevel: LevelIDSchema
})

const LevelExpSchema = Joi.object({
  exp: Joi.number()
    .integer()
    .min(0)
    .required()
})

const CreateQuestionSchema = Joi.object({
  question_type: Joi.string()
    .valid('huruf', 'kata', 'gambar'),
  question_level: LevelIDSchema,
  question: Joi.string()
    // .pattern(/^[a-zA-Z0-9:;,+=/]{1,}$/)
    .pattern(/^[a-zA-Z0-9:/.]{1,}$/)
    .required(),
  answer: Joi.string()
    .alphanum()
    .allow(null)
})

module.exports = {
  UserRegisterSchema,
  UserLoginSchema,
  QuestionIDSchema,
  LevelIDSchema,
  LessonIDSchema,
  LevelUserSchema,
  LevelExpSchema,
  CreateQuestionSchema
}
