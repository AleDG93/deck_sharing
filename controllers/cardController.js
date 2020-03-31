var {PictionaryCard} = require('../entities/card');
var {Deck} = require('../entities/deck');
var pictionaryCards = require('./cards/pictionary_cards.json');
const fs = require('fs');

exports.getDeck = function getDeck(gameType, gameName){

    var dir = 'games/' + gameType + "_" + gameName + "/deck.json";


    var rawDeck = fs.readFileSync(dir);
    var deck = JSON.parse(rawDeck)

    var cardsObjs = []

    deck.cards.forEach(element => {
        cardsObjs.push(new PictionaryCard(element.id, element.word, element.category))
    });
    
    var deck = new Deck(cardsObjs);

    return deck;

}

exports.updateDeck = function updateDeck(gameType, gameName, deck){


    var dir = "games/" + gameType + "_" + gameName + "/deck.json";
    var deck = new Deck(deck.cards);
    var jsonDeck = JSON.stringify(deck);

    try {
        fs.writeFile(dir, jsonDeck, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while overwriting deck");
                return console.log(err);
            }
            console.log("Deck updated");
        });
    } catch(err) {
        console.error(err)
    }
}

exports.getSharedCards = function getSharedCards(gameType, gameName){

    var dir = 'games/' + gameType + "_" + gameName + "/shared_cards.json";

    var rawSharedCards = null;
    try {
        if (fs.existsSync(dir)) {
            rawSharedCards = fs.readFileSync(dir)
        } else {
            return new Deck([])
        }
      } catch(err) {
        console.error(err)
      }
    var sharedCards = JSON.parse(rawSharedCards)

    var cardsObjs = []

    sharedCards.cards.forEach(element => {
        cardsObjs.push(new PictionaryCard(element.id, element.word, element.category))
    });
    
    var sharedDeck = new Deck(cardsObjs);

    return sharedDeck;
}

exports.updateSharedCards = function updateSharedCards(gameType, gameName, updatedCards){


    var dir = 'games/' + gameType + "_" + gameName + "/shared_cards.json";
    console.log(updatedCards);
    var deck = new Deck(updatedCards);
    var jsonDeck = JSON.stringify(deck);

    try {
        fs.writeFile(dir, jsonDeck, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while overwriting shared cards");
                return console.log(err);
            }
            console.log("Shared cards updated");
        });
    } catch(err) {
        console.error(err)
    }
}