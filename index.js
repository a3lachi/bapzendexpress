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



const PORT =  4000;

const prisma = new PrismaClient();

//--------------------------------------------------------------------------------------------------------------------------------



// ///////////////////////////////////////////////////////////////
const imagePath = './images/';


const fileData = path.join(process.cwd(), './', 'data.txt');
const getData = fs.readFileSync(fileData, 'utf8').split('\n');


const dataTree = {
  'A': [],
  'B': [],
  'C': [],
  'D': [],
  'E': [],
  'F': [],
  'G': [],
  'H': [],
  'I': [],
  'J': [],
  'K': [],
  'L': [],
  'M': [],
  'N': [],
  'O': [],
  'P': [],
  'Q': [],
  'R': [],
  'S': [],
  'T': [],
  'U': [],
  'V': [],
  'W': [],
  'X': [],
  'Y': [],
  'Z': [],
  '1': [],
  '2': [],
  '3': [],
  '4': [],
  '5': [],
  '6': [],
  '7': [],
  '8': [],
  '9': []
};
for (const dt of getData) {
  const char = dt[0]
  if (dataTree.hasOwnProperty(char)) {
    dataTree[char].push(dt);
  }
}






//////////////
const getSrc = (name,indice) => {
  const nameWithNoSpace = name.split(' ').join('')
  rez = []
  if (indice === 1) { // RETURN JUST 1 ELMENT FOR COMMANDS
    for (const data of dataTree[name[0]]) {
      const dataRay = data.split('__')
      if (`${nameWithNoSpace}0` === dataRay[0]) {
        rez.push(dataRay[1])
        break
      }
    }
  }
  else {
    for (const data of dataTree[name[0]]) {
      const dataRay = data.split('__')
      if (`${nameWithNoSpace}` === dataRay[0].slice(0,-1)) {
        rez.push(dataRay[1])
      }
    }

  }
  return rez
}
//////////////


////////////////
const araJSON = (bigint) => {
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
        const rez = getSrc(product[0].productname.split(' ').join(''),0)
        res.status(200).json({found:"yes" ,src:rez,data:araJSON(product[0])});
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
          id: BigInt(Number(req.body.id)),
        }
      });
      // deal with element
      if (product.length === 1) {
        const name = product[0].productname.split(' ').join('')
        const srcs = await getSrc(name,0)
        res.status(200).json({found:"yes" ,src:srcs , data:araJSON(product[0]) });
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



///////   POST     //////////////////////////////////////////////////////////
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

        prodsRes.push([produit.productname,await getSrc(produit.productname,0).slice(0,2),Number(produit.id.toString()), Number(produit.price.split('$')[1].split('.')[0])])
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
        prodsRes.push([produit.productname,getSrc(produit.productname,0).slice(0,2),Number(produit.id.toString()), produit.price ])
      }

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













//////    POST    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/customer', async (req, res) => {
  
  // get elements from database  
  try {
    if(req?.body?.email && req?.body?.pwd) {
      if (!req.body.firstname) {
        //////////////// login //////////////
        const customer = await prisma.customer.findMany({
          where: {
            email: req.body.email.toString(),
            pwd : req.body.pwd.toString()
          }
        });
        // deal with element
        if (customer.length === 1) {
          res.status(200).json({info:"user" , "jwt":customer[0].jwt});
          return 
        }
        else {
          ////////////// WRONG PWD OR EMAIL //////////////
          res.status(200).json({info:"wrong"});
          return 
        }
      }
      else {
        //////////////// REGISTER //////////////
         // check if email is already registred
         console.log('--------MRBOOOOOOOOOOOOOOOOHA')
         const customerCheck = await prisma.customer.findMany({
          where: {
            email: req.body.email.toString()
          }
        });
        if (customerCheck.length === 1) {
          res.status(200).json({info:"exist"});
          return
        }

        // NEW USER
        const jwt = 'DnbnbnbnbnbvbnRdfgh78568756756' 
        console.log('--------',jwt)
        const user = await prisma.customer.create({
          data: {
            email:req.body.email.toString(),
            pwd:req.body.pwd.toString(),
            frstname: req.body.firstname.toString(),
            lstname: req.body.lastname.toString(),
            usrname:req.body.username.toString(),
            jwt:jwt
          },
        })
        res.status(200).json({info:"new" , "jwt":jwt});
        return 
      }
    }
  } catch (err)  {
      console.log('try cathced an error.',err)
      res.status(400).json({ data: err });
      return
  }

  res.status(400).json({ data: 0 });
  return
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////   POST     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/customer/commands', async (req, res) => {
  
  // get elements from database
  try {
    if(req?.body?.jwt) {
      const customer = await prisma.customer.findFirst({
        where: {
          jwt: req.body.jwt.toString(),
        },
      })
      // deal with element
      
      const comond = customer.commands + '//' + req.body.cmds.toString() + '|' + req.body.date.toString() + '|' + req.body.adrs.toString()
      console.log(comond)
      const updateCommand = await prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: {
          commands: comond
        },
      });
      
      res.status(200).json({info:'mrboha'});
      return 
    }
  } catch (error) {
      console.log('try cathced an error.',error)
  }

  res.status(400).json({ data: 0 });
  return
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////   POST     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET USERS COMMANDS BY JWT
app.post('/api/customer/token', async (req, res) => {
  
  // get elements from database
  try {
    console.log('STARTED TRYING')
    if(req?.body?.jwt) {
      console.log('bbb',req.body.jwt)
      const customer = await prisma.customer.findMany({
        where: {
          jwt: req.body.jwt.toString(),
        },
      })

      if (customer?.length === 1) {
        
        const commands = customer[0].commands
        console.log('HA LCOMMANDS',commands)
        
        if (commands?.length>5) {
          console.log('COMMANDS LENGTH KBIR')
          
          let  section = [] , id = [] , itemArray = [] ;

          let Commandrezult = []
          let rezult = []


          for (const command of commands.split('//')) {
            section = command.split('|')
            if (section[1]) {
              Commandrezult = [section[1]]  // Dates 
              

              id = []
              for (const item of section[0].split('@')) {
                itemArray = item.split(',')
                if (itemArray[3]) { // ID
                  Product = await prisma.bapz.findFirst({ where: {id:Number(itemArray[3])} })
                  id.push([Product.productname,getSrc(Product.productname,1).slice(0,1), Product.price ,itemArray[1] ,itemArray[2]])
                }
              }
              Commandrezult.push(id)

              Commandrezult.push(section[2]) // Addresse
              rezult.push(Commandrezult)

            }
          }

          res.status(200).json({
            data:rezult,
            'info':[customer[0].email,customer[0].pwd,customer[0].frstname,customer[0].lstname,customer[0].usrname]
          })
          return 
        }
        else {
          res.status(200).json({
            'data':[],
            'info':[customer[0].email,customer[0].pwd,customer[0].frstname,customer[0].lstname,customer[0].usrname]
          })
          return 
        }
      }
      else 
        res.status(200).json({ data:'jwtnotfound'})
        return 
    }
  } catch {
      console.log('try cathced an error.')
  }

  res.status(400).json({ data: 0 });
  return
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








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
