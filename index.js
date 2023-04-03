const express = require('express');
const cors = require('cors');
const swagger = require('./swagger');
const fs = require('fs');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const { readdir } = require('fs').promises;
const path = require ('path')




const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


// // const YAML = require('yamljs');
// // const swaggerDocument = YAML.load('./swagger.yaml');


// //--------------------------------------------------------------------------------------------------------------------------------


const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors()); // Allow all origins to access the API
// app.use(express.static('public'));


// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const PORT = 3000;

// const prisma = new PrismaClient();

// //--------------------------------------------------------------------------------------------------------------------------------



// ///////////////////////////////////////////////////////////////
// const imagePath = './images/';

// //////////////
// const getSrc = (name) => {
//   try {
//     const files = fs.readdirSync(imagePath)  
//     const srcs = []
//     for (const image of files) {
//       imgname = image.split('.jpg')[0].slice(0,-1)
//       if (imgname === name ) {
//         srcs.push(image)
//       }
//     }
//     return srcs 
//   } catch(error) {
//     return [error]
//   }
// }
// //////////////


// //////////////
// const araJSON = (bigint) => {
//   console.log('))))))',bigint)
//   return(
//     {
//       'id':Number(bigint.id.toString()),
//       'productname':bigint.productname,
//       'price':bigint.price,
//       'color':bigint.color,
//       'category':bigint.category,
//       'size':bigint.size,
//     }
//   )
// }

// //////////////


// ///////////////////////////////////////////////////////////////





// //--------------------------------------------------------------------------------------------------------------------------------


// //    / GET  ///////////////////////////////////////////////////
// app.get('/', (req, res) => {
//   res.send({'info':"API CORRECTLY WORKING."})
// });
// ///////////////////////////////////////////////////////////////

// //    / GET  ///////////////////////////////////////////////////
// app.get('/images', (req, res) => {

//   const file = path.join(process.cwd(), './', 'data.txt');
//   const stringified = fs.readFileSync(file, 'utf8');


//   res.send({'data':stringified})
// });
// ///////////////////////////////////////////////////////////////




// //////   POST  /////////////////////////////////////////////////
// app.post('/api/bapz/id', async (req, res) => {

//   // get elements from database
//   const product = await prisma.bapz.findMany({
//     where: {
//       id: BigInt(req.body.id),
//     }
//   });

//   // deal with element
//   if (product.length === 1) {
//     const name = product[0].productname.split(' ').join('')
//     const srcs = await getSrc(name)
//     res.send({'found':"yes",'src': srcs , 'data':araJSON(product[0])})
//   }
//   // product with id = ID don't exist in database
//   else 
//     res.send({'data': 'not found'})
// });
// ///////////////////////////////////////////////////////////////


// //--------------------------------------------------------------------------------------------------------------------------------


// const yaml = require('js-yaml');

// const swaggerPath = path.join(__dirname, 'swagger.yaml');
// const swaggerFileContents = fs.readFileSync(swaggerPath, 'utf8');
// const swaggerDocument = yaml.load(swaggerFileContents);


// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const options = {
//     swaggerDefinition: swaggerDocument,
//     apis: []
// };

// const specs = swaggerJsdoc(options);

// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(specs));






// ///////////////////////////////////////////////////////////////
// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `)
// });
// ///////////////////////////////////////////////////////////////
const YAML = require('yamljs');
const swaggerUiHtml = require('swagger-ui-dist');


const cssFiles = [
  'theme-feeling-blue.css', 'theme-material.css',    'theme-muted.css',        'theme-outline.css',
  'theme-flattop.css'      ,'theme-monokai.css'      ,'theme-newspaper.css'
];


const custmCs = cssFiles.map((file) => {
  return path.join(__dirname, file);
});
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is a sample API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      '/': {
        get: {
          summary: 'Say hello',
          responses: {
            '200': {
              description: 'A successful response',
            },
          },
        },
      },
    },
  }
    ,  
  apis: [path.join(__dirname, './*.js')], // path to the API routes folder
  swaggerOptions: {
    customCss: custmCs,
  },
};

const specs = swaggerJsdoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const swaggerDocument = require('./swagger.json');
const file = path.join(process.cwd(), './', 'theme-material.css');
const fileContent = fs.readFileSync(file, 'utf8').split('\n').join(' ');
const customCss = `
  .operation-tag-content button  {
    background-color: white;
    display:flex;
    font-family: Arial, sans-serif;
  }
`;
const finalcss = fileContent + customCss
var optionss = {
  customCss: finalcss
};



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, optionss));
// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});