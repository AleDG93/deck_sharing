var {PictionaryCard} = require('../entities/card');
var {Deck} = require('../entities/deck');
var pictionaryCards = require('./cards/pictionary_cards.json');
const fs = require('fs');

exports.getDeck = function getDeck(gameName, gameType){

    var dir = '../games/' + gameType + "_" + gameName + "/deck.json";

    var picCards = pictionaryCards.cards;
    var cardsObjs = []
    picCards.forEach(element => {
        cardsObjs.push(new PictionaryCard(element.id, element.name, element.category))
    });
    
    console.log(picCards);

    var deck = new Deck(picCards);

    return deck;

}

exports.updateDeck = function updateDeck(gameName, gameType, deck){


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

exports.getSharedCards = function getSharedCards(gameName, gameType){

    var dir = '../games/' + gameType + "_" + gameName + "/shared_cards.json";

    var picCards = pictionaryCards.cards;
    var cardsObjs = []
    picCards.forEach(element => {
        cardsObjs.push(new PictionaryCard(element.id, element.name, element.category))
    });
    
    var shared_cards = new Deck(picCards);

    return shared_cards;
}