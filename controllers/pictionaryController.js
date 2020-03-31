var express = require('express')
var bodyParser = require('body-parser')
var pictionaryController  = express.Router()
var fs = require('fs');
var cookieParser = require('cookie-parser')
var playerController = require('../controllers/playerController')
var cardController = require('../controllers/cardController')
var teamController = require('../controllers/teamController')
var {PictionaryCard} = require('../entities/card')
var {Deck} = require('../entities/deck');


pictionaryController.use(bodyParser.json())
pictionaryController.use(bodyParser.urlencoded({extended: true}))
pictionaryController.use(cookieParser())

pictionaryController.get('/drawCard', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;
    var deck = cardController.getDeck(gameType, gameName)
    var sharedDeck = cardController.getSharedCards(gameType, gameName)


    // Load player
    var player = playerController.loadPlayer(playerName, gameType, gameName);
    
    // Load teams
    var teams = teamController.loadTeams(gameType, gameName);
    // Load player
    var player = playerController.loadPlayer(playerName, gameType, gameName);
    
    // Load teams
    var teams = teamController.loadTeams(gameType, gameName);

    // Draw a card from deck0
    randomCard = Math.round(Math.random() * (deck.cards.length - 1))

    var card = deck.cards[randomCard]

    // Remove the card from the deck
    var updatedCards = deck.cards.splice(randomCard, 1);
    cardController.updateDeck(gameType, gameName, deck);

    // Add the card to the player
    player.cards.push(card)
    playerController.savePlayer(playerName, gameType, gameName, player);    

    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, player, teams})
    
})

pictionaryController.get('/pass', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;
    var points = req.query.points;
    var teamName = req.cookies['playerTeam']

    var deck = cardController.getDeck(gameType, gameName);
    var sharedCards = cardController.getSharedCards(gameType, gameName);

    var oldPlayer = playerController.loadPlayer(playerName, gameType, gameName);

    // Load teams
    var teams = teamController.loadTeams(gameType, gameName);

    var updatedSharedCards = oldPlayer.cards.concat(sharedCards.cards);
    var sharedDeck = new Deck(updatedSharedCards)

    var player = playerController.removePlayerCards(oldPlayer, gameType, gameName);
    
    teamController.givePoints(gameType, gameName, teamName, points);
    cardController.updateSharedCards(gameType, gameName, updatedSharedCards);

    
    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, player, teams});
})

pictionaryController.get('/refresh', (req, res) => {

    var playerName = req.cookies['playerName'];
    var gameType = req.cookies['gameType'];
    var gameName = req.cookies['gameName'];

    var player = playerController.loadPlayer(playerName, gameType, gameName);
    var sharedDeck = cardController.getSharedCards(gameType, gameName);
    var teams = teamController.loadTeams(gameType, gameName);

    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, player, teams})

})



module.exports = pictionaryController