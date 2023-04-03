const express = require('express');
const cors = require('cors');
const swagger = require('./swagger');
const fs = require('fs');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const { readdir } = require('fs').promises;
const path = require ('path')
const swaggerUi = require('swagger-ui-express');



// //--------------------------------------------------------------------------------------------------------------------------------


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow all origins to access the API
app.use(express.static('public'));



const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

//--------------------------------------------------------------------------------------------------------------------------------



// ///////////////////////////////////////////////////////////////
const imagePath = './images/';

//////////////
const getSrc = (name) => {
  try {
    const file = path.join(process.cwd(), './', './data.txt');
    const imageNames = fs.readFileSync(file, 'utf8').split('\n').map(elem=>elem.split('__')[0])
    
    const srcs = []
    for (const image of imageNames) {
      var imgname = image.slice(0,-1)
      if (imgname === name.split(' ').join('') ) {
        srcs.push(image)
      }
    }
    return srcs 
  } catch(error) {
    return [error]
  }
}
//////////////


////////////////
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
////////////////


/////////////////////////////////////////////////////////////////





////--------------------------------------------------------------------------------------------------------------------------------


////    GET     ///////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send({'info':"API CORRECTLY WORKING."})
});
///////////////////////////////////////////////////////////////

////    GET     ///////////////////////////////////////////////////
app.get('/images', (req, res) => {

  const file = path.join(process.cwd(), './', 'data.txt');
  const stringified = fs.readFileSync(file, 'utf8');


  res.send({'data':stringified})
});
// ///////////////////////////////////////////////////////////////


////    GET     ///////////////////////////////////////////////////
app.post('/ids', async (req, res) => {
  const products = await prisma.bapz.findMany({});
  var idiz = []
  for (const product of products)
    idiz.push(Number(product.id.toString()))

  if (req.body.limit) {
    res.send({'data':idiz.slice(0,req.body.limit)})
  }
  else
    res.send({'data':idiz})
});
/////////////////////////////////////////////////////////////////




////   POST     /////////////////////////////////////////////////
app.post('/api/bapz/id', async (req, res) => {
  console.log(req.body)
  // get elements from database
  try {
    if(req?.body?.id) {
      const product = await prisma.bapz.findMany({
        where: {
          id: BigInt(req.body.id),
        }
      });
      // deal with element
      if (product.length === 1) {
        const name = product[0].productname.split(' ').join('')
        const srcs = await getSrc(name)
        res.status(200).json({found:"yes" });
        return 
      }

    }
  } catch {
    console.log('try cathced an error.')
  }

  res.status(400).json({ data: 0 });
  return
});
/////////////////////////////////////////////////////////////////


////   POST     /////////////////////////////////////////////////
app.post('/api/bapz/product', async (req, res) => {

  // get elements from database
  try {
  if(req?.body?.id) {
    const product = await prisma.bapz.findMany({
      where: {
        id: BigInt(req.body.id),
      }
    });
    // deal with element
    if (product.length === 1) {
      const name = product[0].productname.split(' ').join('')
      const srcs = await getSrc(name)
      res.send({'found':"yes",'src': srcs , 'data':araJSON(product[0]) })
    }

  }
  } catch {
    console.log('try cathced an error.')
  }

  res.status(400).json({ data: 0 });
  return
});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
app.post('/api/bapz/apparel', async (req, res) => {

  // get elements from database
  try {
    if(req?.body?.cat) {
      const products = await prisma.bapz.findMany({
        where: {
          category: req?.body?.cat,
        }
      })
      prodsRes = []
      for (const produit of products) {

        prodsRes.push([produit.productname,getSrc(produit.productname).slice(0,2),Number(produit.id.toString()), Number(produit.price.split('$')[1].split('.')[0])])
      }

      res.status(200).json({ data: prodsRes });
      return
    }
    else {
      const tShirts = await prisma.bapz.findMany({
        where: {
          category: 't-shirts',
        },
        take: 2,
      });
      
      const shoes = await prisma.bapz.findMany({
        where: {
          category: 'shoes',
        },
        take: 2,
      });
      
      const pants = await prisma.bapz.findMany({
        where: {
          category: 'pants',
        },
        take: 2,
      });
      
      const watches = await prisma.bapz.findMany({
        where: {
          category: 'watches',
        },
        take: 2,
      });
      
      const bags = await prisma.bapz.findMany({
        where: {
          category: 'bags',
        },
        take: 2,
      });
      
      const sweats = await prisma.bapz.findMany({
        where: {
          category: 'sweats',
        },
        take: 2,
      });
      
      const products = [...tShirts, ...shoes, ...pants, ...watches, ...bags, ...sweats];
      
      prodsRes = []
      for (const produit of products) {
        prodsRes.push([produit.productname,getSrc(produit.productname).slice(0,2),Number(produit.id.toString()), produit.price ])
      }
      console.log(products.length)

      res.status(200).json({ data: prodsRes });
      return
    }

  }

  catch {
    console.log('Error catched by try.')
  }
  res.status(400).json({ data: 0 });
  return

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////--------------------------------------------------------------------------------------------------------------------------------

////     SWAGGER       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const swaggerDocument = require('./swagger.json');
const file = path.join(process.cwd(), './', 'theme-material.css');
const customCss = fs.readFileSync(file, 'utf8').split('\n').join(' ');
const addedCss = `
  .operation-tag-content button  {
    background-color: white;
    display:flex;
    font-family: Arial, sans-serif;
    all:inherit;
    justify-content:center;
    align-items:center;
    width:100%;
  }

`;
const finalcss = addedCss + customCss
var swaggerOptions = {
  customCss: finalcss
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//        START SERVER       ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
