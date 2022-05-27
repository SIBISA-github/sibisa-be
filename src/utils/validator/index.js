const {
  UserRegisterSchema,
  UserLoginSchema,
  QuestionIDSchema,
  LevelIDSchema,
  LessonIDSchema,
  UserIDSchema,
  UserUpdateSchema
} = require('./schema')

const PayloadValidator = {
  validateUserLogin: (payload) => {
    const validationResult = UserLoginSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateUserRegister: (payload) => {
    const validationResult = UserRegisterSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateQuestionID: (payload) => {
    const validationResult = QuestionIDSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateLevelID: (payload) => {
    const validationResult = LevelIDSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateLessonID: (payload) => {
    const validationResult = LessonIDSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateUserID: (payload) => {
    const validationResult = UserIDSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  },
  validateUserUpdate: (payload) => {
    const validationResult = UserUpdateSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message)
    }

    return true
  }
}

module.exports = PayloadValidator
