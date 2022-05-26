const { Storage } = require('@google-cloud/storage')
const path = require('path')

const storage = new Storage({
  projectId: 'sibisa-351215',
  keyFilename: path.join(__dirname, '../../sibisa-351215-77c1ee60d764.json')
})

const getBuckets = () => {
  storage.getBuckets()
    .then(results => {
      console.log(results)
      // const buckets = results[0]
      // console.log(buckets)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

module.exports = { storage, getBuckets }
