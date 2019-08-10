const router = require('express').Router()
const bodyParser = require('body-parser')
const logger = require('../services/middlewareLogger')
const hdfs = require('../services/hdfs/index')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(logger)

var dir = path.join(__dirname, 'serverUploadFiles');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // making uploading dir if not exist
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })


// Uploading multiple files - files are stored in req.files
router.post('/upload', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  // Files are transferred to hdfs datalake
  for (const file of files){
    hdfs.create('benchmarks', file.path, file.filename)
  }
  res.redirect('http://localhost:3000/')
})

module.exports = router
