'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

//middleware for static files
app.use(express.static(__dirname)); //js and css which are alla in the same folder
app.use(morgan('dev'));

//API
app.get('/', (req,res) =>{
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => console.log("Server ready."));