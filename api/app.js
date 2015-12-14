var express = require('express');
var multer = require('multer');
var s3 = require('multer-s3');
var morgan = require('morgan');
var cors = require('cors');
var uuid = require('uuid');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8000'
}));


var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: 'uploads',
    // set this to your bucket name
    bucket: 'wdi-london',
    // your AWS keys
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    // the region of your bucket
    region: 'eu-west-1',
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

// This will upload a single file. Check out the multer docks for
// uploading multiple files.
app.post('/upload', upload.single('file'), function(req, res) {
  return res.status(200).json({ filename: req.file.filename });
});

app.listen(PORT);
console.log("Express is listening on port " + PORT);