var path = require('path')
// server.js
// load the things we need
var express = require('express');
var app = express();
app.set('views', path.join(__dirname, 'views'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.posix.join(__dirname, 'static')))

//import controllers
var gameController = require('./controllers/gameController');
var pictionaryController = require('./controllers/pictionaryController')

// index page 
app.get('/', function(req, res) {

    res.render('pages/homepage');
});

app.use('/game', gameController)
app.use('/pictionary', pictionaryController)

app.listen(8080);
