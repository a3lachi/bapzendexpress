const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




const { PrismaClient } = require('@prisma/client');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const PORT = 3000;
const prisma = new PrismaClient();
app.use(cors()); // Allow all origins to access the API

app.get('/', (req, res) => {
  res.send({'data':'Hey this is my API running 🥳'})
});


app.post('/api/bapz/id', async (req, res) => {
  const product = await prisma.bapz.findMany({
    where: {
      id: BigInt(req.body.id),
    }
  });

  if (product.length === 1)
    res.send({'data': product[0].productname})
  else 
  res.send({'data': 'not found'})
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});