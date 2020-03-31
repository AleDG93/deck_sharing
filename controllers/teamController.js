var {Teams} = require('../entities/teams');
var {Team} = require('../entities/team');
const fs = require('fs');

exports.createTeams = function createTeams(player, gameType, gameName, playerTeam){

    var dir = "games/" + gameType + "_" + gameName + "/teams.json";

    var teamOrange = new Team('teamOrange', [], 0);
    var teamBlue = new Team('teamBlue', [], 0);
    if(playerTeam == 'teamOrange'){
        teamOrange.players.push(player);
    } else if (playerTeam == 'teamBlue'){
        teamBlue.players.push(player);
    }

    var teams = new Teams([teamOrange, teamBlue]);
    var jsonTeams = JSON.stringify(teams);

    try {
        if (fs.existsSync(dir)) {
            return;
        } else {
            fs.writeFile(dir, jsonTeams, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON teams Object to File.");
                    return console.log(err);
                }
            });
            return teams;
        }
    } catch(err) {
        console.error(err)
    }

}


exports.addPlayer = function addPlayer(player, gameType, gameName, teamName){

    var dir = "games/" + gameType + "_" + gameName + "/teams.json";

    var teams = this.loadTeams(gameType, gameName);
    for(var i = 0; i < teams.team.length; i++){
        if(teams.team[i].name == teamName){
            teams.team[i].players.push(player);
        }
    }

    var jsonTeams = JSON.stringify(teams);

    try {
        fs.writeFile(dir, jsonTeams, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON teams Object to File.");
                return console.log(err);
            }
        });
        return teams;
    } catch(err) {
        console.error(err)
    }
}


exports.loadTeams = function loadTeams(gameType, gameName){

    var dir = "games/" + gameType + "_" + gameName + "/teams.json";
    var rawTeams = fs.readFileSync(dir);
    var teams = JSON.parse(rawTeams);

    return new Teams(teams.team);
}

exports.givePoints = function givePoints(gameType, gameName, teamName, points){

    var teams = this.loadTeams(gameType, gameName);

    var dir = "games/" + gameType + "_" + gameName + "/teams.json";

    for(var i = 0; i < teams.team.length; i++){
        if(teams.team[i].name == teamName){
            teams.team[i].points = parseInt(teams.team[i].points) + parseInt(points);
        }
    }

    var jsonTeams = JSON.stringify(teams);

    try {
        fs.writeFile(dir, jsonTeams, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON teams Object to File.");
                return console.log(err);
            }
        });
        return;
    } catch(err) {
        console.error(err)
    }

}