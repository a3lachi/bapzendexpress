








const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to list the image files in the 'public/images' directory
app.get('/images', (req, res) => {
  try {
    const files = fs.readdirSync('./public/lol');
    const imageFiles = files.filter(file => file.endsWith('.jpg'));
    res.send(imageFiles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});