var express = require('express')
var bodyParser = require('body-parser')
var pictionaryController  = express.Router()
var fs = require('fs');
var cookieParser = require('cookie-parser')
var playerController = require('../controllers/playerController')
var cardController = require('../controllers/cardController')
var {PictionaryCard} = require('../entities/card')


pictionaryController.use(bodyParser.json())
pictionaryController.use(bodyParser.urlencoded({extended: true}))
pictionaryController.use(cookieParser())

pictionaryController.get('/drawCard', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;
    var deck = cardController.getDeck(gameName, gameType)
    var shared_cards = cardController.getSharedCards(gameName, gameType)

    // Load player
    var player = playerController.loadPlayer(playerName, gameType, gameName);
    
    // Draw a card from deck0
    randomCard = Math.round(Math.random() * (deck.cards.length - 1) + 1)

    console.log("Random card: " + randomCard)
    var card = deck.cards[randomCard]

    // Remove the card from the deck
    var updatedCards = deck.cards.splice(randomCard, 1);
    cardController.updateDeck(gameName, gameType, deck);

    // Add the card to the player
    player.cards.push(card)
    playerController.savePlayer(playerName, gameType, gameName, player);    

    res.render('pages/gamePage', {playerName, gameType, gameName, shared_cards, player})
    
})

pictionaryController.get('/pass', (req, res) => {

    var playerName = req.query.playerName;
    var gameType = req.query.gameType;
    var gameName = req.query.gameName;
    var cards = cardController.getDeck(gameType, gameName);
    var shared_cards = cardController.getSharedCards(gameType, gameName); 

    playerController.loadPlayer(playerName, gameType, gameName);


    randomCard = Math.random() * card.length
    console.log("Random card: " + randomCard)
    var card = cards[randomCard]
    var updatedCards = cards.splice(randomCard, 1);
    cardController.updateDeck(updatedCards);
    res.render('pages/gamePage', {playerName, gameType, gameName, shared_cards, deck})
    return JSON.stringify(card);
})



module.exports = pictionaryController