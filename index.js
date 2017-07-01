var path = require('path');
var fs = require('fs');
var express = require('express');
var upload = require('multer')({ dest: 'uploads/' });

var app = express();

// to prettify JSON output
app.set('json spaces', 40);

// to serve static files without routes
app.use(express.static(path.join(__dirname, 'public')));

// to delete a directory
function clrDir(dirPath) {
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  // fs.rmdirSync(dirPath);
};

// routes
app.post('/upload', upload.single('file'), (req, res) => {
  // clears the uploads/ directory to purge the uploaded files
  clrDir('uploads');

  // returns the filename and file size
  res.json({
    'original_name': req.file.originalname,
    'file_size': req.file.size
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});