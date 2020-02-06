const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port=3000;
const Enquiry = require('./enquiry');

app.use(cors({
    origin: 'http://localhost:4200',
}));

app.use(bodyParser.json()); 

var myLogger = function (req, res, next) {
    console.log("myLogger1",req.body);
    next()
}
 
//app.use(myLogger);

app.get('/', function(req,res){
    Enquiry.getEnquiry(req.body)
    .then(data=>{
        res.json(data);
    })
})

app.post('/create', function(req,res){
console.log('create');
 let data = req.body;
 data.createdAt = new Date();
 Enquiry.createEnquiry(data)
 .then(data=>{
     res.json(data);
 });
})

app.post('/search', function(req,res){
   Enquiry.searchEnquiry(req.body.firstName)
    .then(data=>{
        console.log(data);
        res.json(data);
 });
})





app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`)
})