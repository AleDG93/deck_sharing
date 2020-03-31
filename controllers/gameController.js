var express = require('express')
var bodyParser = require('body-parser')
var gameController  = express.Router()
var {Player} = require('../entities/player')
const fs = require('fs')
var cookieParser = require('cookie-parser')
var pictionaryCards = require('./cards/pictionary_cards.json')
var {PictionaryCard} = require('../entities/card')
var playerController = require('../controllers/playerController')

gameController.use(bodyParser.json())
gameController.use(bodyParser.urlencoded({extended: true}))
gameController.use(cookieParser())


gameController.post('/newGame', function(req, res){

    var gameName = req.body['gameName'];
    var playerName = req.body['playerName'];
    var gameType = req.body['gameType'];
    var dir = 'games/' + gameType + "_" + gameName;
    
    if(!createGame(dir)){
        res.send("Rifai e scegli un altro nome per il gioco, zio Billy...");
        return;
    } else {
        instantiateGame(gameType, playerName, gameName, dir)    
        res.cookie('gameName', gameName);
        res.cookie('gameType', gameType)
        res.cookie('playerName', playerName);
        res.render('pages/gamePage', {gameType, playerName, gameName})
    }
})

gameController.post('/joinGame', function(req, res){
    
    var gameName = req.body['gameName'];
    var playerName = req.body['playerName'];
    var gameType = req.body['joinGameType'];

    playerController.createPlayer(playerName, gameType, gameName);

    res.cookie('gameName', gameName);
    res.cookie('gameType', gameType)
    res.cookie('playerName', playerName);
    res.render('pages/gamePage', {gameType, playerName, gameName});

})



function instantiateGame(gameType, playerName, gameName, dir){

    if(gameType == 'risiko'){
        createRisikoDeck(dir);
    } else if(gameType == 'pictionary'){
        createPictionaryDeck(dir);
        playerController.createPlayer(playerName, gameType, gameName);
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

function createPlayer(playerName, gameType, gameName){

    var dir = "games/" + gameType + "_" + gameName + "/" + playerName + ".json";
    var player = new Player(playerName, []);
    var jsonPlayer = JSON.stringify(player);

    try {
        if (fs.existsSync(dir)) {
            return;
        } else {
            fs.writeFile(dir, jsonPlayer, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
            });
            return;
        }
    } catch(err) {
        console.error(err)
    }
}

module.exports = gameController