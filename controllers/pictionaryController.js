var express = require('express')
var bodyParser = require('body-parser')
var pictionaryController  = express.Router()
var fs = require('fs');
var cookieParser = require('cookie-parser')
var pictionaryCards = 'cards/pictionary_cards'
var playerController = require('../controllers/playerController')


pictionaryController.use(bodyParser.json())
pictionaryController.use(bodyParser.urlencoded({extended: true}))
pictionaryController.use(cookieParser())

pictionaryController.get('/drawCard', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;

    playerController.loadPlayer(playerName, gameType, gameName);
    
})


module.exports = pictionaryController