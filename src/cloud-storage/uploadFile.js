const multer = require('multer')

class UploadFiles {
  static fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname)
    }
  })

  static fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
}

module.exports = UploadFiles
