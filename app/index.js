const express = require('express');
const app = express();
const apiRouter = require('./src/routes/api.routes');

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

app.use("/api/leisurecentres", apiRouter);


app.listen(port, function () {
    console.log('GUIDAP API listening on port ' + port);
});