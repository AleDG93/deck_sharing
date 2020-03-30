var {Player} = require('../entities/player')
const fs = require('fs')

exports.createPlayer = function createPlayer(playerName, gameType, gameName){

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
                console.log("JSON player created");
            });
            return;
        }
    } catch(err) {
        console.error(err)
    }
}

exports.loadPlayer = function loadPlayer(playerName, gameType, gameName){
    
}