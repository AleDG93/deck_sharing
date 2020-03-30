var express = require('express')
var bodyParser = require('body-parser')
var cardController  = express.Router()


cardController.get('/card/drawCard/:gameId/:playerId', function(req, res){
    res.send(createGame())
})



module.exports = cardController