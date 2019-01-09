const express = require('express');
const hsb = require('hbs');
const fs = require('fs');

var app = express();
hsb.registerPartials('F:/Node_Work/Test_Work/NodeWebServerDemo1/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log',log + '\n',(err) => {
        if(err){
            console.log('Unable to create a file');
        }
    });
    next();

});
//hello
console.log('');
app.use((req,res,next) => {
   res.render('maintenance.hbs');
});

app.use(express.static('F:/Node_Work/Test_Work/NodeWebServerDemo1/public'));

hsb.registerHelper('year',()=> new Date().getFullYear());

hsb.registerHelper('scremIt',(text) =>{
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMesssage : 'Hello Darshan!!!'
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs', {
        pageTitle : 'Testing About'
    });
});

// app.get('/main',(req,res) => {
//    res.render('maintenance.hbs');
// });

app.get('/bad',(req,res) =>{
    res.send({
        status : 'ok',
        user : [
            {
                name:'kateshiya'
            },
            {
                name:'good'
            }
        ]
    });
});

app.listen(3000, () =>{
    console.log('server run in port no 3000');
});