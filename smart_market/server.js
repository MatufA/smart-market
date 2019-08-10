// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
var path = require('path');
var fs = require('fs');
const request = require('request')

// Create Express app
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
 
 
// Routes will go here
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');   
});

app.get('/graph', function(req, res){
  res.sendFile(__dirname + '/graphs.html');
})

app.listen(3000, () => console.log('Server started on port 3000'));

var dir = './serverUploadFiles';
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
app.post('/', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  // Files are transferred to hdfs datalake
  res.sendFile(__dirname + '/index.html')
  
  // for (let file in req.files)
  //   fs.createReadStream(file).pipe(request.post('http://localhost:5000//api/v1/hdfs/upload'))
})