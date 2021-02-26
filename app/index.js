const express = require('express');
const app = express();
const apiRouter = require('./src/routes/leisurecentre.routes');
// Load variable env
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`<h1>Hi Guidap team <br>
         I am djilali ABBES <br>
         I am your future colleague <br>
         I let you consult and test my API <br>
         excellent day see you soon </h1> `);
});

app.use("/api/leisurecentre", apiRouter);

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


const moment  = require("moment");
const tz = require('moment-timezone')
const start = moment.tz("Europe/Paris").add(1, 'days').startOf('day').utc().unix();
const end = moment.tz("Europe/Paris").add(1, 'days').endOf('day').utc().unix();
console.log(start,end)
app.listen(port, function () {
    console.log('GUIDAP API listening on port ' + port);
});