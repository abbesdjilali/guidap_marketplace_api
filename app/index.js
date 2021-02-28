const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//ROUTES
const leisureCentreRouter = require('./src/routes/leisurecentre.routes');
const categoriesRouter = require('./src/routes/categories.routes');
const usersRouter = require('./src/routes/user.routes')

// LOAD ENV VARIABLES
require('dotenv').config();

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc = require('./swagger.json');

//TEST
const fetch = require('node-fetch');
const {data} = require("./data");

//insert data to database 
const insertCategories = () => {
    data.categories.forEach(cat => {
        fetch('http://localhost:3000/api/categories', {
            method: "POST",
            body: JSON.stringify(cat),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJkamlsYWwiLCJlbWFpbCI6ImRqaWxhbGlAZ3VpZGFwLmNvIiwiaWF0IjoxNjE0NTMwMDgwfQ.BBuRaCVQoMowr2VtLV8TTYer2Z2E0Szm1-XpqY6dePw'
            }
        })
    })

}

const insertLeisuresCentres = async () => {
    data.leisureCentres.forEach(lc => {
        fetch('http://localhost:3000/api/leisurecentre', {
            method: "POST",
            body: JSON.stringify(lc),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJkamlsYWwiLCJlbWFpbCI6ImRqaWxhbGlAZ3VpZGFwLmNvIiwiaWF0IjoxNjE0NTMwMDgwfQ.BBuRaCVQoMowr2VtLV8TTYer2Z2E0Szm1-XpqY6dePw'
            }
        })
    });
}
//  insertLeisuresCentres()
//  insertCategories()
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
app.use("/api/leisurecentre", leisureCentreRouter);
app.use("/api/categories", categoriesRouter);
app.use('/user', usersRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSdoc));






const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('GUIDAP API listening on port ' + port);
});