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

const {
    updateWeatherDataEvery7Days
}=require("./src/services/cronjob.services");


//UPDATE WEATHER DATA EVERY 7 DAYS FOR ALL LEISURE CENTRE START
const cron = require('node-cron');
cron.schedule('0 0 * * 0', () => {
    console.log('UPDATE WEATHER DATA FOR ALL LEISURE CENTRE START');
    updateWeatherDataEvery7Days()
});


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

console.log(process.env.MYSQL_HOST)


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('GUIDAP API listening on port ' + port);
});