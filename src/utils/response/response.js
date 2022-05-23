class Response {
<<<<<<< HEAD
    static badResponse (message, statusCode) {
        return {
            status: false,
            message: message,
            error_code: statusCode
        }
    }

    static successResponse (statusCode, message, data) {
        if (data) {
            return {
                status: statusCode,
                message: message,
                data: data
            }
        } else {
            return {
                status: statusCode,
                message: message
            }
        }
    }
=======
  static badResponse (message, statusCode) {
    return {
      status: false,
      message: message,
      error_code: statusCode
    }
  }

  static successResponse (statusCode, message, data) {
    if (data) {
      return {
        status: statusCode,
        message: message,
        data: data
      }
    } else {
      return {
        status: statusCode,
        message: message
      }
    }
  }
>>>>>>> dev
}

module.exports = Response
