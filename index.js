var path = require('path');
var express = require('express');
var upload = require('multer')({ dest: 'uploads/' });
var env = require('node-env-file');

var app = express();

env(__dirname + '/.env');

// to prettify JSON output
app.set('json spaces', 40);

// to serve static files without routes
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    'original_name': req.file.originalname,
    'file_size': req.file.size
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});