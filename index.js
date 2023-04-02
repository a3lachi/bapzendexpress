const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(cors()); // Allow all origins to access the API

app.get('/', (req, res) => {
  res.send({'data':'Hey this is my API running 🥳'})
});


app.get('/prsma', async (req, res) => {
  const users = await prisma.bapz.findMany({
    take: 2
  });
  // res.json(users);
  var rezu = ""
  for (const product of users) {
    rezu+=product.productname
  }
  res.send({'data':'Hey this is my API running 🥳'+rezu})
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});