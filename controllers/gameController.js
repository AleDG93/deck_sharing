var express = require('express')
var bodyParser = require('body-parser')
var gameController  = express.Router()
var {Player} = require('../entities/player')
const fs = require('fs')
var cookieParser = require('cookie-parser')
var pictionaryCards = require('./cards/pictionary_cards.json')
var {PictionaryCard} = require('../entities/card')
var playerController = require('../controllers/playerController')
var teamController = require('../controllers/teamController')

gameController.use(bodyParser.json())
gameController.use(bodyParser.urlencoded({extended: true}))
gameController.use(cookieParser())


gameController.post('/newGame', function(req, res){

    var gameName = req.body['gameName'];
    var playerName = req.body['playerName'];
    var gameType = req.body['gameType'];
    var dir = 'games/' + gameType + "_" + gameName;
    var playerTeam = req.body['playerTeam'];

    var newPlayer = new Player(playerName, [], playerTeam);
    if(!createGame(dir)){
        res.send("Rifai e scegli un altro nome per il gioco, zio Billy...");
        return;
    } else {
        var [player, teams] = instantiateGame(gameType, newPlayer, gameName, dir, playerTeam);
        res.cookie('gameName', gameName);
        res.cookie('gameType', gameType)
        res.cookie('playerName', playerName);
        res.cookie('playerTeam', playerTeam);
        res.render('pages/gamePage', {gameType, player, gameName, teams})
    }
})

gameController.post('/joinGame', function(req, res){
    
    var gameName = req.body['gameName'];
    var playerName = req.body['playerName'];
    var gameType = req.body['joinGameType'];
    var playerTeam = req.body['playerTeam'];

    var newPlayer = new Player(playerName, [], playerTeam);

    var player = playerController.createPlayer(playerName, gameType, gameName, playerTeam);
    var teams = teamController.addPlayer(player, gameType, gameName, playerTeam);

    res.cookie('gameName', gameName);
    res.cookie('gameType', gameType)
    res.cookie('playerName', playerName);
    res.cookie('playerTeam', playerTeam);
    res.render('pages/gamePage', {gameType, player, gameName, teams});

})


gameController.get('/logout', function(req, res){
    
    var gameName = req.body['gameName'];
    var playerName = req.body['playerName'];
    var gameType = req.body['joinGameType'];

    res.clearCookie('gameName');
    res.clearCookie('gameType')
    res.clearCookie('playerName');
    res.clearCookie('playerTeam');
    res.render('pages/homepage');

})

function instantiateGame(gameType, player, gameName, dir, playerTeam){

    if(gameType == 'risiko'){
        createRisikoDeck(dir);
    } else if(gameType == 'pictionary'){
        createPictionaryDeck(dir);
        var newPlayer = playerController.createPlayer(player.playerName, gameType, gameName, playerTeam);
        var teams = teamController.createTeams(player, gameType, gameName, playerTeam)
        return [newPlayer, teams];
    } else if(gameType == 'taboo'){
        createTabooDeck(dir);
    }
}


function createPictionaryDeck(dir){

    fs.copyFile('controllers/cards/pictionary_cards.json', dir + "/deck.json", (err) => {
        if (err) throw err;
    });

}

function createGame(dir){

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        return true
    } else {
        return false
    }
}

module.exports = gameController