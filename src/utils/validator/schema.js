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

const UserUpdateSchema = Joi.object({
  name: Joi.string()
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
})

const QuestionIDSchema = Joi.number().integer().required()

const LevelIDSchema = Joi.number().integer().required()

const LessonIDSchema = Joi.number().integer().required()

const UserIDSchema = Joi.number().integer().required()

module.exports = {
  UserRegisterSchema,
  UserLoginSchema,
  QuestionIDSchema,
  LevelIDSchema,
  LessonIDSchema,
  UserIDSchema,
  UserUpdateSchema
}
