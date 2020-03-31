var {Player} = require('../entities/player')
const fs = require('fs')

exports.createPlayer = function createPlayer(playerName, gameType, gameName, playerTeam){

    var dir = "games/" + gameType + "_" + gameName + "/" + playerName + ".json";
    var player = new Player(playerName, [], playerTeam);
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
            return player;
        }
    } catch(err) {
        console.error(err)
    }
}

exports.loadPlayer = function loadPlayer(playerName, gameType, gameName){

    var dir = "games/" + gameType + "_" + gameName + "/" + playerName + ".json";
    var rawPlayer = fs.readFileSync(dir);
    var player = JSON.parse(rawPlayer);

    return new Player(player.playerName, player.cards, player.team);
}

exports.savePlayer = function savePlayer(playerName, gameType, gameName, player){
 
    var dir = "games/" + gameType + "_" + gameName + "/" + playerName + ".json";
    var player = new Player(playerName, player.cards, player.team);
    var jsonPlayer = JSON.stringify(player);

    try {
        fs.writeFile(dir, jsonPlayer, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });
    } catch(err) {
        console.error(err)
    }
}

exports.removePlayerCards = function removePlayerCards(player, gameType, gameName){

    var dir = "games/" + gameType + "_" + gameName + "/" + player.playerName + ".json";
    var player = new Player(player.playerName, [], player.team);
    var jsonPlayer = JSON.stringify(player);

    try {
        fs.writeFile(dir, jsonPlayer, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });
    } catch(err) {
        console.error(err)
    }

    return player;
}