const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
// const { PrismaClient } = require('@prisma/client');
const { readdir } = require('fs').promises;
const path = require ('path')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow all origins to access the API
// app.use(express.static('public'));


app.use(express.static('public'));


const PORT = 3000;



// const prisma = new PrismaClient();



//    / GET  ///////////////////////////////////////////////////
app.get('/', (req, res) => {
  const file = path.join(process.cwd(), './', 'mf.txt');
  const stringified = fs.readFileSync(file, 'utf8');

  res.send({'data':stringified})
});
///////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////
const imagePath = './images/';


//////////////
const araJSON = (bigint) => {
  console.log('))))))',bigint)
  return(
    {
      'id':Number(bigint.id.toString()),
      'productname':bigint.productname,
      'price':bigint.price,
      'color':bigint.color,
      'category':bigint.category,
      'size':bigint.size,
    }
  )
}

//////////////


///////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////
// app.post('/api/bapz/id', async (req, res) => {

//   fs.readFile('mf.txt', 'utf8', function(err, data) {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }

//     // Send the file contents as the response
//     res.send({'data':data});
//   });


//   // get elements from database
//   // const product = await prisma.bapz.findMany({
//   //   where: {
//   //     id: BigInt(req.body.id),
//   //   }
//   // });

//   // // deal with element
//   // if (product.length === 1) {
//   //   const name = product[0].productname.split(' ').join('')
//   //   const srcs = await getSrc(name)
//   //   res.send({'found':"yes",'src': srcs , 'data':araJSON(product[0])})
//   // }
//   // // product with id = ID don't exist in database
//   // else 
//   //   res.send({'data': 'not found'})
// });
///////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});
///////////////////////////////////////////////////////////////


