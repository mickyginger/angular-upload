var express = require('express');
var multer = require('multer');
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
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, './uploads');
    },
    filename: function(req, file, next) {
      var ext = '.' + file.mimetype.replace('image/', '');
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

app.post('/upload', upload.single('file'), function(req, res) {
  return res.status(200).json({ filename: req.file.filename });
});

app.listen(PORT);
console.log("Express is listening on port " + PORT);