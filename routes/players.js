// Lottery With Friends -- PLAYERS

var express = require("express");
var router = express.Router();
var Player = require("../models/player");

// INDEX -- show all players 
router.get("/", function(req, res){
	// get all tickets from lotteryBD database
	Player.find({}, function (err, allPlayers){
		if(err){
			console.log(err);
		} else {
			res.render("players/indexplayers", {players: allPlayers, currentUser: req.user});
		}
	});
});

// ******************************************
// CREATE - add new player to database 
// ******************************************
router.post("/", function(req, res){
	// get data from form
	var person = req.body.person;
	var image = req.body.image;
	var contactInfo = req.body.contactInfo;
	var wager = req.body.wager;
	
	var newPlayer = {
		person: person, 
		image: image,
		contactInfo: contactInfo,
		wager: wager
	}
	
	// create a new player and add to players database -- matches line 101
	
Player.create(newPlayer, function(err, newlyCreated){
		if(err){
			console.log(err);
		}	else {
			res.redirect("/players");
		}
	});
	// players.push(newPlayer);
	// redirect back to campgrounds
});

// NEW form to create new player 
router.get("/newplayer", function(req, res){
	res.render("players/newplayer.ejs");
});

// SHOW -- Shows more info about player 
router.get("/:id", function(req, res){
	// find the ticket with the provided ID
			Player.findById(req.params.id).populate("comments").exec(function(err, foundPlayer){
					if(err) {
						console.log(err);
					} else {
						console.log(foundPlayer);
						
						// render show template with that ticket
					 res.render ("players/showplayer", {player: foundPlayer});
					}
			});
});

module.exports = router;