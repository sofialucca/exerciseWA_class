'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

//init express
const app = express();
const port = 3001;

//set up middlewares
app.use(morgan('dev'));
app.use(express.json());

/*** APIs ***/

app.get("/", (req,res) => {
    res.send('Hello');
})

//GET all exams /api/exams
app.get('/api/exams', (request,response) => {
    dao.listExams()
        .then(exams => response.json(exams)) //automatically send back success message without explicit status
        .catch(() => response.status(500).end());
})

//PUT /api/exams/:code
app.put('/api/exams/:code', async(req,res) => {
    const examToUpdate = req.body;

    if(req.params.code === req.body.code){
        try{
            await dao.updateExam(examToUpdate);
            res.status(200).end();            
        }catch(err){
            res.status(503).json({error:`Databse error while updating ${examToUpdate.code}`});
        }
    }else{
        res.status(503).json({error:`Databse error while updating ${examToUpdate.code}`});
    }
})

//activate server
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));