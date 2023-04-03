const express = require('express');
const cors = require('cors');
const swagger = require('./swagger');
const bodyParser = require('body-parser');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { readdir } = require('fs').promises;
const path = require ('path')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


//--------------------------------------------------------------------------------------------------------------------------------


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow all origins to access the API
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

const prisma = new PrismaClient();

//--------------------------------------------------------------------------------------------------------------------------------



///////////////////////////////////////////////////////////////
const imagePath = './images/';

//////////////
const getSrc = (name) => {
  try {
    const files = fs.readdirSync(imagePath)  
    const srcs = []
    for (const image of files) {
      imgname = image.split('.jpg')[0].slice(0,-1)
      if (imgname === name ) {
        srcs.push(image)
      }
    }
    return srcs 
  } catch(error) {
    return [error]
  }
}
//////////////


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





//--------------------------------------------------------------------------------------------------------------------------------


//    / GET  ///////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send({'info':"API CORRECTLY WORKING."})
});
///////////////////////////////////////////////////////////////

//    / GET  ///////////////////////////////////////////////////
app.get('/images', (req, res) => {
  const file = path.join(process.cwd(), './', 'data.txt');
  const stringified = fs.readFileSync(file, 'utf8');


  res.send({'data':stringified})
});
///////////////////////////////////////////////////////////////




//////   POST  /////////////////////////////////////////////////
app.post('/api/bapz/id', async (req, res) => {

  // get elements from database
  const product = await prisma.bapz.findMany({
    where: {
      id: BigInt(req.body.id),
    }
  });

  // deal with element
  if (product.length === 1) {
    const name = product[0].productname.split(' ').join('')
    const srcs = await getSrc(name)
    res.send({'found':"yes",'src': srcs , 'data':araJSON(product[0])})
  }
  // product with id = ID don't exist in database
  else 
    res.send({'data': 'not found'})
});
///////////////////////////////////////////////////////////////


//--------------------------------------------------------------------------------------------------------------------------------





///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
});
///////////////////////////////////////////////////////////////
