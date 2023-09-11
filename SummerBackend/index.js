const express = require('express');
const multer = require('multer');
const cors = require('cors');


const fs = require('fs');
const path = require('path');

const app = express();
app.options('/products', cors()) // enable pre-flight request for DELETE request
app.post('/products', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for post origins!'})
})
app.use(cors()); // Enable CORS for all routes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve the images from the folder
const imagesFolder = path.join(__dirname, 'images/');
app.use('/images', express.static(imagesFolder));

// Get a list of all image filenames in the folder
app.get('/image-list', (req, res) => {
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read image folder' });
    } else {
      const imageFiles = files.filter((file) => {
        // Filter only image files (you can customize the filter based on your requirements)
        const extname = path.extname(file);
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
      });
      res.json({ images: imageFiles });
    }
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log(req);
    // File upload is successful
    res.sendStatus(200); // OK
  } else {
    // No file uploaded or upload failed
    res.sendStatus(404); // Not Found
  }
});

app.delete('/upload', upload.single('upload'), (req, res) => {
  console.log("Delete");
  res.sendStatus(200);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
