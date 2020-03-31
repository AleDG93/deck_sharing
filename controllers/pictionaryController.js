var express = require('express')
var bodyParser = require('body-parser')
var pictionaryController  = express.Router()
var fs = require('fs');
var cookieParser = require('cookie-parser')
var playerController = require('../controllers/playerController')
var cardController = require('../controllers/cardController')
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
    
    // Draw a card from deck0
    randomCard = Math.round(Math.random() * (deck.cards.length - 1))

    console.log("Random card: " + randomCard)
    var card = deck.cards[randomCard]

    // Remove the card from the deck
    var updatedCards = deck.cards.splice(randomCard, 1);
    cardController.updateDeck(gameType, gameName, deck);

    // Add the card to the player
    player.cards.push(card)
    playerController.savePlayer(playerName, gameType, gameName, player);    

    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, player})
    
})

pictionaryController.get('/pass', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;

    var deck = cardController.getDeck(gameType, gameName);
    var sharedCards = cardController.getSharedCards(gameType, gameName);

    var player = playerController.loadPlayer(playerName, gameType, gameName);

    var updatedSharedCards = player.cards.concat(sharedCards.cards);
    var sharedDeck = new Deck(updatedSharedCards)

    var updatedPlayer = playerController.removePlayerCards(playerName, gameType, gameName);

    cardController.updateSharedCards(gameType, gameName, updatedSharedCards);
    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, updatedPlayer});
})

pictionaryController.get('/refresh', (req, res) => {

    var playerName = req.cookies['playerName'];
    var gameType = req.cookies['gameType'];
    var gameName = req.cookies['gameName'];
    

    var player = playerController.loadPlayer(playerName, gameType, gameName);
    var sharedDeck = cardController.getSharedCards(gameType, gameName);

    res.render('pages/gamePage', {playerName, gameType, gameName, sharedDeck, player})

})



module.exports = pictionaryController