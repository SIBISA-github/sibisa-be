const {
  UserRegisterSchema,
  UserLoginSchema
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
  }
}

module.exports = PayloadValidator
