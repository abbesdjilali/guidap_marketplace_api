const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//ROUTES
const apiRouter = require('./src/routes/leisurecentre.routes');

// LOAD ENV VARIABLES
require('dotenv').config();

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc =require('./swagger.json');
// const swaggerJSdoc = require('swagger-jsdoc');

const {options} = require('./src/config/swagger.config');



// USE
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(`<h1>Hi Guidap team <br>
         I am djilali ABBES <br>
         I am your future colleague <br>
         I let you consult and test my API <br>
         excellent day see you soon </h1> `);
});
app.use("/api/leisurecentre", apiRouter);
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerJSdoc,options));



//insert data to database 
//  (async () => {

//     const fetch = require('node-fetch');
//     const {data} =  require("./data");
//     for await (leisureCentre of data){
//         await fetch('http://localhost:3000/api/leisurecentre',
//         {
//             method : "POST",
//             body: JSON.stringify(leisureCentre),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//     };
// })()  


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('GUIDAP API listening on port ' + port);
});