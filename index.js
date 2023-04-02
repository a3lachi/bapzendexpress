const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');



const imagePath = './images/';



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow all origins to access the API



const PORT = 4000;



const prisma = new PrismaClient();





//    / GET  ///////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send({'data':'Hey this is my API running 🥳'})
});
///////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////
app.post('/api/bapz/id', async (req, res) => {

  // get elements from database
  const product = await prisma.bapz.findMany({
    where: {
      id: BigInt(req.body.id),
    }
  });

  // deal with element
  fs.readdir(imagePath, (err, elements) => {
    if (err) {
      console.log(err);
    } else {

      
      console.log(elements);
    }
  });

  if (product.length === 1) {
    const name = product[0].productname.split(' ').join('')
    res.send({'data': name})
  }
  
  else 
    res.send({'data': 'not found'})
});
///////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});
///////////////////////////////////////////////////////////////