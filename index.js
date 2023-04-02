const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins to access the API

app.get('/', (req, res) => {
  res.send({'data':'Hey this is my API running 🥳'})
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});