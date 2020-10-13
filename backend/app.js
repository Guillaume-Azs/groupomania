const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const dataRoute = require('./Routes/user'); //Appel des routes utilisateurs
const messageRoute = require('./Routes/message'); //Appel des routes messages
const path = require('path');

app.use((req, res, next) => { // configuration des CORS, pour permettre à différentes adresse localhost de communiquer entre elles
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : "50mb"}));//body parser pour convertir les objets JSON des requêtes POST
app.use(express.json({limit : "50mb"}));
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));


app.use('/api/', dataRoute);
app.use('/api/', messageRoute);


module.exports = app;